import { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';

import { db } from 'db/config';

import { formatDiscountNumber } from 'helpers/format';

export const useCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const productsRef = collection(db, 'products');

  const latestDoc = useRef();

  const getCollection = async ({
    collectionName = 'products',
    isNewQuery = false,
    sortBy = { field: 'createdAt', direction: 'asc' },
  }) => {
    setError(null);

    try {
      if (isNewQuery) {
        latestDoc.current = 0;
        setHasMore(true);
      }

      let productsQuery;

      let constraints = [orderBy(sortBy.field, sortBy.direction)];

      if (sortBy.field === 'createdAt') {
        constraints.unshift(orderBy('collection'));
      }

      if (sortBy.direction === 'desc' && !latestDoc.current) {
        constraints.push(limit(3));
      } else {
        constraints.push(
          startAfter(isNewQuery ? 0 : latestDoc.current),
          limit(3)
        );
      }

      if (collectionName === 'products') {
        productsQuery = query(productsRef, ...constraints);
      } else {
        productsQuery = query(
          productsRef,
          where('collection', '==', collectionName),
          ...constraints
        );
      }

      const productsSnapshot = await getDocs(productsQuery);

      if (productsSnapshot.size === 0) {
        setHasMore(false);
        setIsLoading(false);
        return [];
      }

      setIsLoading(true);

      latestDoc.current =
        productsSnapshot.docs[productsSnapshot.docs.length - 1];

      const productsPromises = productsSnapshot.docs.map(async (productDoc) => {
        const productData = {
          productId: productDoc.id,
          ...productDoc.data(),
        };

        const skusRef = collection(productDoc.ref, 'skus');

        const skusQuery = query(skusRef, orderBy('order'));

        const skusSnapshot = await getDocs(skusQuery);

        const skus = [];

        skusSnapshot.forEach((skuDoc) =>
          skus.push({
            skuId: skuDoc.id,
            ...skuDoc.data(),
          })
        );

        const variantsRef = collection(productDoc.ref, 'variants');

        const variantsSnapshot = await getDocs(variantsRef);

        const productVariants = [];

        variantsSnapshot.forEach((variantDoc) => {
          let variantSkus = skus
            .filter((sku) => sku.variantId === variantDoc.id)
            .map((sku) => ({
              size: sku.size,
              skuId: sku.skuId,
              quantity: sku.quantity,
            }));

          let availableQuantity = variantSkus.reduce((result, obj) => {
            if (!obj.size) {
              result['singleSize'] = obj.quantity;
            } else {
              result[obj.size] = obj.quantity;
            }
            return result;
          }, {});

          const sizes = Object.keys(availableQuantity);

          const isSoldOut = variantSkus.every((sku) => sku.quantity === 0);

          const { price: actualPrice, ...restProductData } = productData;
          const {
            variantPrice: currentPrice,
            images: variantImages,
            ...restVariantData
          } = variantDoc.data();

          const formattedVariantImages = variantImages.map((image) => ({
            ...image,
            url: `${restProductData.slug}-${restVariantData.color}`,
          }));

          productVariants.push({
            id: uuid(),
            variantId: variantDoc.id,
            price: currentPrice,
            actualPrice,
            ...restProductData,
            ...restVariantData,
            slides: formattedVariantImages,
            numberOfVariants: variantsSnapshot.size,
            availableQuantity,
            sizes,
            skus: variantSkus,
            discount: formatDiscountNumber({
              currentPrice,
              actualPrice,
            }),
            isSoldOut,
          });
        });

        return productVariants;
      });

      const products = await Promise.all(productsPromises);

      setIsLoading(false);
      return [].concat(...products);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getCollection, isLoading, hasMore, error };
};
