import { useState } from 'react';

import { doc, setDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { user } = useAuthContext();
  const { items, totalAmount, dispatch } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (itemToAdd) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedTotalAmount = totalAmount + 1;

      const itemInCartIndex = items.findIndex(
        (item) => item.id === itemToAdd.id
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

      const cartRef = doc(db, 'carts', user.uid);

      await setDoc(cartRef, {
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

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const removeItem = async (itemToRemove) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedTotalAmount = totalAmount - 1;

      const itemInCartIndex = items.findIndex(
        (item) => item.id === itemToRemove.id
      );
      const itemInCart = items[itemInCartIndex];

      let updatedItems;

      if (itemInCart.amount === 1) {
        updatedItems = items.filter((item) => item.id !== itemToRemove.id);
      } else {
        const updatedItem = { ...itemInCart, amount: itemInCart.amount - 1 };
        updatedItems = [...items];
        updatedItems[itemInCartIndex] = updatedItem;
      }

      const cartRef = doc(db, 'carts', user.uid);

      if (updatedTotalAmount === 0) {
        await deleteDoc(cartRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else {
        await setDoc(cartRef, {
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
      setError(err);
      setIsLoading(false);
    }
  };

  const deleteItem = async (itemToDelete) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedTotalAmount = totalAmount - itemToDelete.amount;

      const updatedItems = items.filter((item) => item.id !== itemToDelete.id);

      const cartRef = doc(db, 'carts', user.uid);

      if (updatedTotalAmount === 0) {
        await deleteDoc(cartRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else {
        await setDoc(cartRef, {
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

  const deleteCart = async () => {
    const cartRef = doc(db, 'carts', user.uid);
    await deleteDoc(cartRef);
    dispatch({
      type: 'DELETE_CART',
    });
  };

  return { addItem, removeItem, deleteItem, deleteCart, isLoading, error };
};
