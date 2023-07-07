import { useState } from 'react';

import {
  doc,
  collectionGroup,
  query,
  where,
  setDoc,
  deleteDoc,
  documentId,
  getDocs,
} from 'firebase/firestore';

import { db } from 'db/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { addAllItemsQuantity } from 'helpers/item';
import { CustomError } from 'helpers/error/customError';
import { handleError } from 'helpers/error/handleError';

export const useInventory = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const skusRef = collectionGroup(db, 'skus');
  const cartRef = doc(db, 'carts', user.uid);

  const checkInventory = async (items) => {
    setError(null);
    setIsLoading(true);
    try {
      const skuIdList = items.map(
        (item) =>
          'products/' + item.productId + '/skus/' + item.skuId
      );

      const skus = {};

      while (skuIdList.length) {
        const batch = skuIdList.splice(0, 10);
        const q = query(skusRef, where(documentId(), 'in', [...batch]));
        const skusSnapshot = await getDocs(q);

        skusSnapshot.forEach((doc) => {
          skus[doc.id] = { skuId: doc.id, ...doc.data() };
        });
      }

      let updatedItems = [...items];
      let stockDifference;

      for (const item of items) {
        const { quantity: availableQuantity } = skus[item.skuId];

        if (availableQuantity <= 0) {
          stockDifference = true;
          updatedItems = updatedItems.filter(
            (cartItem) => cartItem.skuId !== item.skuId
          );
        } else if (availableQuantity < item.quantity) {
          stockDifference = true;
          const itemInCartIndex = updatedItems.findIndex(
            (i) => i.skuId === item.skuId
          );
          updatedItems[itemInCartIndex].quantity = availableQuantity;
        }
      }

      const cartTotalItemQuantity = addAllItemsQuantity(updatedItems);

      if (cartTotalItemQuantity === 0) {
        await deleteDoc(cartRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else if (stockDifference) {
        await setDoc(cartRef, {
          items: updatedItems,
        });

        dispatch({
          type: 'UPDATE_CART',
          payload: updatedItems,
        });
      }

      if (stockDifference) {
        throw new CustomError(
          'Available stock is limited. Quantities in cart have been updated!'
        );
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(handleError(err));
      setIsLoading(false);
    }
  };

  return { checkInventory, isLoading, error };
};

export default useInventory;
