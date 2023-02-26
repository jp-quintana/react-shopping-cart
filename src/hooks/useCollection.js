import { useState } from 'react';

import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/config';

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

  const getCollection = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const products = [];
      const variants = [];

      const querySnapshot = await getDocs(productsRef);
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      for (const product of products) {
        for (const variant of product.variants) {
          variants.push({
            model: product.model,
            collection: product.collection,
            type: product.type,
            productId: product.id,
            variantId: variant.id,
            color: variant.color,
            colorDisplay: variant.colorDisplay,
            currentPrice: variant.currentPrice,
            actualPrice: variant.actualPrice,
            slug: variant.slug,
            images: variant.images,
            numberOfVariants: product.variants.length,
          });
        }
      }

      return variants;
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getCollection, isLoading, error };
};
