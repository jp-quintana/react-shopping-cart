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

export const useInventory = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const skusRef = collectionGroup(db, 'variantSkusTest2');
  const cartRef = doc(db, 'carts', user.uid);

  const checkInventory = async (items) => {
    setError(null);
    setIsLoading(true);
    try {
      const skuIdList = items.map(
        (item) =>
          'productsTest2/' + item.productId + '/variantSkusTest2/' + item.skuId
      );

      const skus = [];

      while (skuIdList.length) {
        const batch = skuIdList.splice(0, 10);
        const q = query(skusRef, where(documentId(), 'in', [...batch]));
        const skusSnapshot = await getDocs(q);

        skusSnapshot.forEach((doc) => {
          skus.push({ skuId: doc.id, ...doc.data() });
        });
      }

      let updatedItems = [...items];
      let stockDifference;
      console.log('skus', skus);

      //TODO: Fix
      for (const [index, item] of items.entries()) {
        const { quantity: availableQuantity } = skus[index];
        console.log('items', item);
        if (availableQuantity <= 0) {
          stockDifference = true;
          updatedItems = updatedItems.filter(
            (cartItem) => cartItem.skuId !== item.skuId
          );
        } else if (availableQuantity < item.quantity) {
          stockDifference = true;
          updatedItems[index].quantity = availableQuantity;
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
        throw Error(
          'Available stock is limited. Quantities in cart have been updated!'
        );
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError({ details: err.message });
      setIsLoading(false);
    }
  };

  return { checkInventory, isLoading, error };
};

export default useInventory;
