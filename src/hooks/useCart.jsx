import { useState } from 'react';

import { doc, getDoc, setDoc, deleteDoc, collection } from 'firebase/firestore';

import { db } from 'db/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { addAllItemsQuantity } from 'helpers/item';
import { CustomError } from 'helpers/error/customError';
import { handleError } from 'helpers/error/handleError';

export const useCart = () => {
  const { user } = useAuthContext();
  const { items, dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(false);
  const [error, setError] = useState(null);

  // const getCurrentStock = async (itemId) => {
  //   const skuRef = doc(db, 'inventory', itemId);
  //   const skuDoc = await getDoc(skuRef);

  //   return skuDoc.data();
  // };

  const getCurrentStock = async (productId, skuId) => {
    const skuRef = doc(collection(db, 'products', productId, 'skus'), skuId);
    const skuDoc = await getDoc(skuRef);

    return skuDoc.data();
  };

  const addItem = async (itemToAdd) => {
    if (isLoading) return;
    setLoadingItemId(itemToAdd.skuId);
    setError(null);
    setIsLoading(true);
    try {
      const itemInCartIndex = items.findIndex(
        (item) => item.skuId === itemToAdd.skuId
      );

      const itemInCart = items[itemInCartIndex];

      let updatedItems = [...items];

      const { quantity: availableQuantity } = await getCurrentStock(
        itemToAdd.productId,
        itemToAdd.skuId
      );

      let noStock;
      let stockWasUpdated;

      if (availableQuantity <= 0) {
        if (itemInCart) {
          updatedItems = updatedItems.filter(
            (item) => item.skuId !== itemInCart.skuId
          );
          noStock = true;
        } else {
          throw new CustomError(
            `Size ${itemToAdd.size.toUpperCase()} is out of stock!`
          );
        }
      } else {
        if (itemInCart) {
          if (itemInCart.quantity > availableQuantity) {
            itemInCart.quantity = availableQuantity;
            stockWasUpdated = true;
          } else if (itemInCart.quantity === availableQuantity) {
            throw new CustomError('All available stock is currently in cart!');
          } else {
            const updatedItem = {
              ...itemInCart,
              quantity: itemInCart.quantity + 1,
            };

            updatedItems[itemInCartIndex] = updatedItem;
          }
        } else {
          const addedItem = {
            ...itemToAdd,
            quantity: 1,
          };
          updatedItems.push(addedItem);
        }
      }

      const cartTotalItemQuantity = addAllItemsQuantity(updatedItems);

      const cartRef = doc(db, 'carts', user.uid);

      if (cartTotalItemQuantity === 0) {
        await deleteDoc(cartRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else {
        const updatedItemsDb = updatedItems.map((item) => ({
          skuId: item.skuId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        }));

        await setDoc(cartRef, {
          items: updatedItemsDb,
        });

        dispatch({
          type: 'UPDATE_CART',
          payload: updatedItems,
        });
      }

      if (noStock) {
        throw new CustomError('This item is out of stock. Cart was updated!');
      }

      if (stockWasUpdated) {
        throw new CustomError(
          'Stock is limited. Item quantity in cart updated!'
        );
      }

      setLoadingItemId(null);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(handleError(err));
      setLoadingItemId(null);
      setIsLoading(false);
    }
  };

  const removeItem = async (productId, skuId) => {
    setLoadingItemId(skuId);
    setError(null);
    setIsLoading(true);
    try {
      const itemInCartIndex = items.findIndex((item) => item.skuId === skuId);
      const itemInCart = items[itemInCartIndex];

      let updatedItems = [...items];

      let noStock;
      let stockWasUpdated;

      if (itemInCart.quantity === 1) {
        updatedItems = items.filter((item) => item.skuId !== skuId);
      } else {
        const { quantity: availableQuantity } = await getCurrentStock(
          productId,
          skuId
        );

        if (availableQuantity <= 0) {
          updatedItems = updatedItems.filter(
            (item) => item.skuId !== itemInCart.skuId
          );
          noStock = true;
        } else if (availableQuantity < itemInCart.quantity) {
          const updatedItem = {
            ...itemInCart,
            quantity: availableQuantity,
          };

          updatedItems[itemInCartIndex] = updatedItem;

          stockWasUpdated = true;
        } else {
          const updatedItem = {
            ...itemInCart,
            quantity: itemInCart.quantity - 1,
          };

          updatedItems[itemInCartIndex] = updatedItem;
        }
      }

      const cartTotalItemQuantity = addAllItemsQuantity(updatedItems);

      const cartRef = doc(db, 'carts', user.uid);

      if (cartTotalItemQuantity === 0) {
        await deleteDoc(cartRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else {
        const updatedItemsDb = updatedItems.map((item) => ({
          skuId: item.skuId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        }));

        await setDoc(cartRef, {
          items: updatedItemsDb,
        });

        dispatch({
          type: 'UPDATE_CART',
          payload: updatedItems,
        });
      }

      if (noStock) {
        throw new CustomError(
          'This item is out of stock and was removed from cart!'
        );
      }

      if (stockWasUpdated) {
        throw new CustomError(
          'Stock is limited. Item quantity in cart updated!'
        );
      }

      setLoadingItemId(null);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingItemId(null);
      setError(handleError(err));
      setIsLoading(false);
    }
  };

  const deleteItem = async (skuId) => {
    setError(null);
    setIsLoading(true);
    try {
      const itemInCartIndex = items.findIndex((item) => item.skuId === skuId);
      const itemInCart = items[itemInCartIndex];

      const updatedItems = items.filter(
        (item) => item.skuId !== itemInCart.skuId
      );

      const cartRef = doc(db, 'carts', user.uid);

      const cartTotalItemQuantity = addAllItemsQuantity(updatedItems);

      if (cartTotalItemQuantity === 0) {
        await deleteDoc(cartRef);

        dispatch({
          type: 'DELETE_CART',
        });
      } else {
        const updatedItemsDb = updatedItems.map((item) => ({
          skuId: item.skuId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        }));

        await setDoc(cartRef, {
          items: updatedItemsDb,
        });

        dispatch({
          type: 'UPDATE_CART',
          payload: updatedItems,
        });
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError({ details: err.message });
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

  const activateCartCheck = () => {
    dispatch({ type: 'CHECK' });
  };

  return {
    addItem,
    removeItem,
    deleteItem,
    deleteCart,
    activateCartCheck,
    isLoading,
    loadingItemId,
    error,
  };
};
