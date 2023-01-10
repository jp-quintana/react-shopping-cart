import { useState } from 'react';

import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { user } = useAuthContext();
  const { items, totalAmount, dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentStock = async (itemId) => {
    const skuRef = doc(db, 'inventory', itemId);
    const skuDoc = await getDoc(skuRef);

    return skuDoc.data();
  };

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

      const { stock } = await getCurrentStock(itemToAdd.id);

      if (stock === 0) {
        // TODO: LIMPAR PRODUCTO DE CARRITO SI INVENTARIO === 0;
        throw Error('No Stock');
      }

      let stockWasUpdated;

      if (itemInCart) {
        if (itemInCart.amount > stock) {
          itemInCart.amount = stock - 1;
          stockWasUpdated = true;
        }

        if (itemInCart.amount === stock) {
          throw Error('All Products In Cart');
        }

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

      if (stockWasUpdated) {
        throw Error('Stock Was Updated');
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      switch (err.message) {
        case 'No Stock': {
          setError({
            details: 'No hay mas stock de este producto',
          });
          break;
        }
        case 'All Products In Cart': {
          console.log('in here');
          setError({
            details:
              'Todos los productos en el inventario están en tu carrito.',
          });
          break;
        }
        case 'Stock Was Updated': {
          setError({
            details:
              'Las cantidades de este producto en tu carrito fueron actualizadas para reflejar la cantidad disponible en el inventario',
          });
          break;
        }
        default: {
          setError(err);
        }
      }
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
