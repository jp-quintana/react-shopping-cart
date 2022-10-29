import { useState } from 'react';

import { doc, setDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { items, totalAmount, id: cartId, dispatch } = useCartContext();
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

      if (cartId) {
        const docRef = doc(db, 'carts', cartId);
        await setDoc(docRef, {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });

        dispatch({
          type: 'UPDATE_CART',
          payload: {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          },
        });
      } else {
        const newCartId = (Math.floor(Math.random() * 1000000) + 1).toString();
        localStorage.setItem('CART_IN_STORAGE', newCartId);

        const docRef = doc(db, 'carts', newCartId);
        await setDoc(docRef, {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });

        dispatch({
          type: 'NEW_CART',
          payload: {
            id: newCartId,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          },
        });
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  const removeItem = async (itemToRemove) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedTotalAmount = totalAmount - 1;

      const itemInCartIndex = items.findIndex(
        (item) => item.sku === itemToRemove.sku
      );
      const itemInCart = items[itemInCartIndex];

      let updatedItems;

      if (itemInCart.amount === 1) {
        updatedItems = items.filter((item) => item.sku !== itemToRemove.sku);
      } else {
        const updatedItem = { ...itemInCart, amount: itemInCart.amount - 1 };
        updatedItems = [...items];
        updatedItems[itemInCartIndex] = updatedItem;
      }

      const docRef = doc(db, 'carts', cartId);

      if (updatedTotalAmount === 0) {
        localStorage.removeItem('CART_IN_STORAGE');
        await deleteDoc(docRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else {
        await setDoc(docRef, {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });

        dispatch({
          type: 'UPDATE_CART',
          payload: {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          },
        });
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  const deleteItem = async (itemToDelete) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedTotalAmount = totalAmount - itemToDelete.amount;

      const updatedItems = items.filter(
        (item) => item.sku !== itemToDelete.sku
      );

      const docRef = doc(db, 'carts', cartId);

      if (updatedTotalAmount === 0) {
        localStorage.removeItem('CART_IN_STORAGE');
        await deleteDoc(docRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else {
        await setDoc(docRef, {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });

        dispatch({
          type: 'UPDATE_CART',
          payload: {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          },
        });
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return { addItem, removeItem, deleteItem, isLoading, error };
};
