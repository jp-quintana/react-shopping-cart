import { useState } from 'react';

import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';

import { useCartContext } from './useCartContext';

const useCart = () => {
  const { dispatch } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (item) => {
    setError(null);
    setIsLoading(true);
    try {
      const cartInStorageId = localStorage.getItem('CART_IN_STORAGE');
      if (cartInStorageId) {
      } else {
        const id = Math.floor(Math.random() * 1000000) + 1;
        localStorage.setItem('CART_IN_STORAGE', id);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };
  return <div>useCart</div>;
};

export default useCart;
