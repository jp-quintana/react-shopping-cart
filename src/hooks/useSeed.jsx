import { useState } from 'react';
import { collection, doc, writeBatch } from 'firebase/firestore';

import { db } from 'db/config';

import moment from 'moment';

import products from 'data/products.json';

export const useSeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadProducts = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const batch = writeBatch(db);
      const productsRef = collection(db, 'products');

      for (const product of products) {
        const newProductRef = doc(productsRef);
        batch.set(newProductRef, {
          collection: product.collection,
          description: product.description,
          model: product.model,
          price: product.price,
          slug: product.slug,
          type: product.type,
          fit: product.fit,
          updatedAt: moment().toDate(),
          createdAt: moment().toDate(),
        });

        const variantsRef = collection(newProductRef, 'variants');
        const skusRef = collection(newProductRef, 'skus');

        for (const variant of product.variants) {
          const newVariantRef = doc(variantsRef);
          batch.set(newVariantRef, {
            color: variant.color,
            images: variant.images,
            variantPrice: variant.variantPrice,
            productId: newProductRef.id,
            updatedAt: moment().toDate(),
            createdAt: moment().toDate(),
          });

          for (const sku of variant.skus) {
            const newSkusRef = doc(skusRef);
            batch.set(newSkusRef, {
              order: sku.order,
              quantity: sku.quantity,
              size: sku.size,
              value: sku.value,
              productId: newProductRef.id,
              variantId: newVariantRef.id,
            });
          }
        }
      }

      await batch.commit();
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { uploadProducts, isLoading, error };
};
