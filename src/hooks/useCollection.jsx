import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  collectionGroup,
} from 'firebase/firestore';

import { db } from 'db/config';

export const useCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const productsRef = collection(db, 'productsTest2');

  // const getCollection = async () => {
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     const products = [];
  //     const variants = [];

  //     const querySnapshot = await getDocs(productsRef);
  //     querySnapshot.forEach((doc) => {
  //       products.push({ id: doc.id, ...doc.data() });
  //     });

  //     for (const product of products) {
  //       for (const variant of product.variants) {
  //         variants.push({
  //           model: product.model,
  //           collection: product.collection,
  //           type: product.type,
  //           id: variant.variantId,
  //           color: variant.color,
  //           price: variant.price,
  //           url: variant.url,
  //           images: variant.images,
  //           numberOfVariants: product.variants.length,
  //         });
  //       }
  //     }

  //     return variants;
  //   } catch (err) {
  //     console.error(err);
  //     setError(err);
  //     setIsLoading(false);
  //   }
  // };

  // const getCollection = async () => {
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     const products = [];
  //     const variants = [];

  //     const querySnapshot = await getDocs(productsRef);
  //     querySnapshot.forEach((doc) => {
  //       products.push({ id: doc.id, ...doc.data() });
  //     });

  //     for (const product of products) {
  //       for (const variant of product.variants) {
  //         variants.push({
  //           model: product.model,
  //           collection: product.collection,
  //           type: product.type,
  //           productId: product.id,
  //           variantId: variant.id,
  //           color: variant.color,
  //           colorDisplay: variant.colorDisplay,
  //           currentPrice: variant.currentPrice,
  //           actualPrice: variant.actualPrice,
  //           slug: variant.slug,
  //           images: variant.images,
  //           numberOfVariants: product.variants.length,
  //         });
  //       }
  //     }

  //     return variants;
  //   } catch (err) {
  //     console.error(err);
  //     setError(err);
  //     setIsLoading(false);
  //   }
  // };

  const getCollection = async ({ collectionName = 'hoodies' }) => {
    setError(null);
    setIsLoading(true);

    try {
      const productsQuery = query(
        productsRef,
        where('collection', '==', collectionName)
      );

      const productsSnapshot = await getDocs(productsQuery);

      const productsPromises = productsSnapshot.docs.map(async (productDoc) => {
        const productData = {
          productId: productDoc.id,
          ...productDoc.data(),
        };

        const variantsSkusRef = collection(productDoc.ref, 'variantSkusTest2');

        const variantsSkusSnapshot = await getDocs(variantsSkusRef);

        const variantsSkus = [];

        variantsSkusSnapshot.forEach((variantsSkuDoc) =>
          variantsSkus.push({
            variantSkuId: variantsSkuDoc.id,
            ...variantsSkuDoc.data(),
          })
        );

        const variantsRef = collection(productDoc.ref, 'variantsTest2');

        const variantsSnapshot = await getDocs(variantsRef);

        const productVariants = [];

        variantsSnapshot.forEach((variantDoc) =>
          productVariants.push({
            id: uuid(),
            variantId: variantDoc.id,
            ...productData,
            ...variantDoc.data(),
            skus: variantsSkus.filter((sku) => sku.variantId === variantDoc.id),
          })
        );

        return productVariants;
      });

      const products = await Promise.all(productsPromises);

      return [].concat(...products);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getCollection, isLoading, error };
};
