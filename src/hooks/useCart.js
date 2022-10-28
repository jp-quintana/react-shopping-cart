import { useState } from 'react';

import { doc, setDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { items, totalAmount, dispatch } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (itemToAdd) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedTotalAmount = totalAmount + 1;

      const itemInCartIndex = items.findIndex(
        (item) => item.sku === itemToAdd.sku
      );
      const itemInCart = items[itemInCartIndex];

      let updatedItems = [...items];

      if (itemInCart) {
        const updatedItem = {
          ...itemInCart,
          amount: itemInCart.amount + 1,
        };
        updatedItems[itemInCartIndex] = updatedItem;
      } else {
        const addedItem = {
          ...itemToAdd,
          amount: 1,
        };
        updatedItems.push(addedItem);
      }

      let cartId = localStorage.getItem('CART_IN_STORAGE');

      if (cartId) {
        const docRef = doc(db, 'carts', cartId);
        await setDoc(docRef, {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });
      } else {
        cartId = Math.floor(Math.random() * 1000000) + 1;
        localStorage.setItem('CART_IN_STORAGE', cartId);

        const docRef = doc(db, 'carts', cartId);
        await setDoc(docRef, {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });
      }

      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: cartId,
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        },
      });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  return { addItem, isLoading, error };
};
