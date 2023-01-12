import { useState } from 'react';

import {
  doc,
  collection,
  query,
  where,
  setDoc,
  deleteDoc,
  documentId,
  getDocs,
} from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { totalCartAmount } from 'helpers/cart';

export const useInventory = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const inventoryRef = collection(db, 'inventory');
  const cartRef = doc(db, 'carts', user.uid);

  const checkInventory = async (items) => {
    console.log('in inventory hook', items);
    setError(null);
    setIsLoading(true);
    try {
      const idList = items.map((item) => item.id);

      const skus = [];

      while (idList.length) {
        const batch = idList.splice(0, 10);
        const q = query(inventoryRef, where(documentId(), 'in', [...batch]));
        const inventorySnapshot = await getDocs(q);

        inventorySnapshot.forEach((doc) => {
          skus.push({ id: doc.id, ...doc.data() });
        });
      }

      const updatedItems = [...items];
      const stockDifference = [];

      for (const item of items) {
        const { stock } = skus.find((sku) => sku.id === item.id);

        if (stock === 0) {
          console.log('aca stock es 0');
          stockDifference.push(true);
          updatedItems = updatedItems.filter(
            (cartItem) => cartItem.id !== item.id
          );
        } else if (stock < item.amount) {
          stockDifference.push(true);
          const itemInCartIndex = updatedItems.findIndex(
            (i) => i.id === item.id
          );
          updatedItems[itemInCartIndex].amount = stock;
        }
      }

      const updatedTotalAmount = totalCartAmount(updatedItems);
      console.log('updatedTotalAmount', updatedItems);

      if (updatedTotalAmount === 0) {
        await deleteDoc(cartRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else if (stockDifference.length > 0) {
        console.log('en setDoc', updatedItems);
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

      console.log(stockDifference);

      if (stockDifference.length > 0) {
        throw Error(
          'No hay stock de algunos productos en el carrito. Las cantidades en el carrito fueron actualizadas.',
          {
            cause: 'custom',
          }
        );
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err.cause === 'custom') {
        setError({ details: err.message });
      } else {
        setError(err);
      }
      setIsLoading(false);
    }
  };

  return { checkInventory, isLoading, error };
};

export default useInventory;
