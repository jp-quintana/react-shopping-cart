import { useState } from 'react';

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

  const productsRef = collection(db, 'products');

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
  //     console.log(err);
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

  //     console.log(products);

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
  //     console.log(err);
  //     setError(err);
  //     setIsLoading(false);
  //   }
  // };

  const productsTestRef = collection(db, 'productsTest');

  const getCollection = async ({ collectionName = 't-shirts' }) => {
    setError(null);
    setIsLoading(true);

    try {
      const productsQuery = query(
        productsTestRef,
        where('collection', '==', collectionName)
      );

      const productsSnapshot = await getDocs(productsQuery);

      const productPromises = productsSnapshot.docs.map(async (productDoc) => {
        const productData = productDoc.data();

        const variantsRef = collection(productDoc.ref, 'variantsTest');

        const variantsQuery = query(
          variantsRef,
          where('productId', '==', productDoc.id),
          orderBy('order')
        );
        const variantsSnapshot = await getDocs(variantsQuery);

        const variantsData = variantsSnapshot.docs.map((variantDoc) =>
          variantDoc.data()
        );

        return {
          product: productData,
          variants: variantsData,
        };
      });

      const products = await Promise.all(productPromises);

      console.log(products);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getCollection, isLoading, error };
};
