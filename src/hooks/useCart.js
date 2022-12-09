import { useState } from 'react';

import { doc, collection, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { cartId: userCartId } = useAuthContext();
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

      if (!cartId && userCartId) {
        const cartRef = doc(db, 'carts', userCartId);
        await setDoc(cartRef, {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });

        dispatch({
          type: 'CREATE_CART',
          payload: {
            id: userCartId,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          },
        });
      } else if (cartId) {
        const cartRef = doc(db, 'carts', cartId);
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
      } else {
        const cartRef = await addDoc(collection(db, 'carts'), {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });

        localStorage.setItem('CART_IN_STORAGE', cartRef.id);

        dispatch({
          type: 'CREATE_CART',
          payload: {
            id: cartRef.id,
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

      const cartRef = doc(db, 'carts', cartId);

      if (updatedTotalAmount === 0) {
        localStorage.removeItem('CART_IN_STORAGE');
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

      const updatedItems = items.filter(
        (item) => item.sku !== itemToDelete.sku
      );

      const cartRef = doc(db, 'carts', cartId);

      if (updatedTotalAmount === 0) {
        localStorage.removeItem('CART_IN_STORAGE');
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

  return { addItem, removeItem, deleteItem, isLoading, error };
};
