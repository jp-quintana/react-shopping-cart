import { useState } from 'react';

import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useProductContext } from './useProductContext';

export const useProduct = () => {
  const { selectedProduct, dispatch } = useProductContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const productsRef = collection(db, 'products');

  const getProducts = async () => {
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
            id: variant.variantId,
            color: variant.color,
            price: variant.price,
            url: variant.url,
            images: variant.images,
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

  const selectVariant = (variantId) => {
    const variant = selectedProduct.variants.find(
      (variant) => variant.variantId === variantId
    );

    dispatch({ type: 'SELECT_VARIANT', payload: variant });
  };

  const selectSize = ({ id, value, stock }) => {
    dispatch({ type: 'SELECT_SIZE', payload: { id, value, stock } });
  };

  return { getProducts, selectVariant, selectSize, isLoading, error };
};
