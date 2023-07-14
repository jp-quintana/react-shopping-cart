import { useState, useEffect, useRef } from 'react';
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

export const useCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const productsRef = collection(db, 'products');

  const latestDoc = useRef();

  const getCollection = async ({
    collectionName = 'products',
    isNewQuery = false,
  }) => {
    setError(null);
    setIsLoading(true);

    try {
      if (isNewQuery) {
        latestDoc.current = 0;
      }

      let productsQuery;

      if (collectionName === 'products') {
        productsQuery = query(
          productsRef,
          orderBy('collection'),
          startAfter(isNewQuery ? 0 : latestDoc.current),
          limit(3)
        );
      } else {
        productsQuery = query(
          productsRef,
          where('collection', '==', collectionName),
          orderBy('collection'),
          startAfter(isNewQuery ? 0 : latestDoc.current),
          limit(3)
        );
      }

      const productsSnapshot = await getDocs(productsQuery);

      console.log('productsSnapshot:', productsSnapshot);

      if (productsSnapshot.size === 0) {
        setHasMore(false);
        setIsLoading(false);
        return [];
      }

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

        variantsSnapshot.forEach((variantDoc) =>
          productVariants.push({
            id: uuid(),
            variantId: variantDoc.id,
            ...productData,
            ...variantDoc.data(),
            skus: skus.filter((sku) => sku.variantId === variantDoc.id),
            numberOfVariants: variantsSnapshot.size,
          })
        );

        return productVariants;
      });

      const products = await Promise.all(productsPromises);

      console.log(products);

      setIsLoading(false);
      return [].concat(...products);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   document.addEventListener('keydown', onKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', onKeyDown);
  //   };
  // }, [onKeyDown]);
  // const getCollection = async ({ collectionName = 'hoodies' }) => {
  //   setError(null);
  //   setIsLoading(true);

  //   try {
  //     let productsQuery;

  //     if (collectionName === 'products') {
  //       productsQuery = query(productsRef);
  //     } else {
  //       productsQuery = query(
  //         productsRef,
  //         where('collection', '==', collectionName)
  //       );
  //     }

  //     const productsSnapshot = await getDocs(productsQuery);

  //     // if (productsSnapshot.size === 0) {
  //     //   throw new CustomError('Collection does not exist', 404);
  //     // }

  //     const productsPromises = productsSnapshot.docs.map(async (productDoc) => {
  //       const productData = {
  //         productId: productDoc.id,
  //         ...productDoc.data(),
  //       };

  //       const skusRef = collection(productDoc.ref, 'skus');

  //       // TODO: need to order this in the future with OrderBy
  //       const skusSnapshot = await getDocs(skusRef);

  //       const skus = [];

  //       skusSnapshot.forEach((skuDoc) =>
  //         skus.push({
  //           skuId: skuDoc.id,
  //           ...skuDoc.data(),
  //         })
  //       );

  //       const variantsRef = collection(productDoc.ref, 'variants');

  //       const variantsSnapshot = await getDocs(variantsRef);

  //       const productVariants = [];

  //       variantsSnapshot.forEach((variantDoc) =>
  //         productVariants.push({
  //           id: uuid(),
  //           variantId: variantDoc.id,
  //           ...productData,
  //           ...variantDoc.data(),
  //           skus: skus.filter((sku) => sku.variantId === variantDoc.id),
  //           numberOfVariants: variantsSnapshot.size,
  //         })
  //       );

  //       return productVariants;
  //     });

  //     const products = await Promise.all(productsPromises);

  //     setIsLoading(false);
  //     return [].concat(...products);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err);
  //     setIsLoading(false);
  //   }
  // };

  return { getCollection, isLoading, hasMore, error };
};
