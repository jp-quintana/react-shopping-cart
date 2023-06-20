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

  const getCollection = async ({ collectionName = 'hoodies' }) => {
    setError(null);
    setIsLoading(true);

    try {
      // TODO: define order
      const productsQuery = query(
        productsTestRef,
        where('collection', '==', collectionName)
      );

      const productsSnapshot = await getDocs(productsQuery);

      const productsPromises = productsSnapshot.docs.map(async (productDoc) => {
        const productData = {
          productId: productDoc.id,
          ...productDoc.data(),
        };

        // const variantsRef = collection(productDoc.ref, 'variantsTest');

        // const variantsQuery = query(
        //   variantsRef,
        //   // where('productId', '==', productDoc.id),
        //   orderBy('order')
        // );

        // const variantsSnapshot = await getDocs(variantsQuery);

        // const variantsData = variantsSnapshot.docs.map((variantDoc) => ({
        //   variantId: variantDoc.id,
        //   ...variantDoc.data(),
        // }));

        const imagesRef = collection(productDoc.ref, 'productImagesTest');

        const imagesSnapshot = await getDocs(imagesRef);

        const variants = [];

        imagesSnapshot.forEach((imageDoc) =>
          variants.push({
            id: uuid(),
            ...productData,
            ...imageDoc.data(),
            color: imageDoc.id.split('_')[1],
            numberOfVariants: imagesSnapshot.size,
            // inventory: variantsData.map(
            //   (variant) => variant.color === imageDoc.id.split('_')[1]
            // ),
          })
        );

        return {
          variants,
        };
      });

      const products = await Promise.all(productsPromises);

      setIsLoading(false);
      return products;
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getCollection, isLoading, error };
};
