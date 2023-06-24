import { useState } from 'react';

import { doc, getDoc, setDoc, deleteDoc, collection } from 'firebase/firestore';

import { db } from 'db/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { addAllItemsQuantity } from 'helpers/item';

export const useCart = () => {
  const { user } = useAuthContext();
  const { items, totalAmount, dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const getCurrentStock = async (itemId) => {
  //   const skuRef = doc(db, 'inventory', itemId);
  //   const skuDoc = await getDoc(skuRef);

  //   return skuDoc.data();
  // };

  const getCurrentStock = async (productId, skuId) => {
    const skuRef = doc(
      collection(db, 'productsTest2', productId, 'variantSkusTest2'),
      skuId
    );
    const skuDoc = await getDoc(skuRef);

    return skuDoc.data();
  };

  const addItem = async (itemToAdd) => {
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
          throw Error(`Size ${itemToAdd.size} is out of stock!`);
        }
      } else {
        if (itemInCart) {
          if (itemInCart.quantity > availableQuantity) {
            itemInCart.quantity = availableQuantity;
            stockWasUpdated = true;
          } else if (itemInCart.quantity === availableQuantity) {
            throw Error('All available stock is currently in cart!');
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

      console.log('aca');

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
        throw Error('This item is out of stock. Cart was updated!');
      }

      if (stockWasUpdated) {
        throw Error('Stock is limited. Item quantity in cart updated!');
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError({ details: err.message });
      setIsLoading(false);
    }
  };

  // const removeItem = async (itemToRemove) => {
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     const itemInCartIndex = items.findIndex(
  //       (item) => item.id === itemToRemove.id
  //     );
  //     const itemInCart = items[itemInCartIndex];

  //     let updatedItems = [...items];

  //     const { stock } = await getCurrentStock(itemToRemove.id);

  //     let noStock;
  //     let stockWasUpdated;

  //     if (itemInCart.amount === 1) {
  //       updatedItems = items.filter((item) => item.id !== itemInCart.id);
  //     } else {
  //       if (stock <= 0) {
  //         updatedItems = updatedItems.filter(
  //           (item) => item.id !== itemInCart.id
  //         );
  //         noStock = true;
  //       } else if (stock < itemInCart.amount) {
  //         const updatedItem = {
  //           ...itemInCart,
  //           amount: stock,
  //         };

  //         updatedItems[itemInCartIndex] = updatedItem;

  //         stockWasUpdated = true;
  //       } else {
  //         const updatedItem = { ...itemInCart, amount: itemInCart.amount - 1 };
  //         updatedItems[itemInCartIndex] = updatedItem;
  //       }
  //     }

  //     const updatedTotalAmount = totalCartAmount(updatedItems);

  //     const cartRef = doc(db, 'carts', user.uid);

  //     if (updatedTotalAmount === 0) {
  //       await deleteDoc(cartRef);

  //       dispatch({
  //         type: 'DELETE_CART',
  //       });
  //     } else {
  //       await setDoc(cartRef, {
  //         items: updatedItems,
  //         totalAmount: updatedTotalAmount,
  //       });

  //       dispatch({
  //         type: 'UPDATE_CART',
  //         payload: {
  //           items: updatedItems,
  //           totalAmount: updatedTotalAmount,
  //         },
  //       });
  //     }

  //     if (noStock) {
  //       throw Error(
  //         'No hay más stock de este producto. Las cantidades en el carrito fueron actualizadas.',
  //         { cause: 'custom' }
  //       );
  //     }

  //     if (stockWasUpdated) {
  //       throw Error(
  //         'Hay menos unidades disponibles que las cantidades en el carrito. Las cantidades en el carrito fueron actualizadas.',
  //         {
  //           cause: 'custom',
  //         }
  //       );
  //     }

  //     setIsLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     if (err.cause === 'custom') {
  //       setError({ details: err.message });
  //     } else {
  //       setError(err);
  //     }
  //     setIsLoading(false);
  //   }
  // };

  const removeItem = async (productId, skuId) => {
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
            amount: itemInCart.quantity - 1,
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
        await setDoc(cartRef, {
          items: updatedItems,
        });

        dispatch({
          type: 'UPDATE_CART',
          payload: {
            items: updatedItems,
          },
        });
      }

      if (noStock) {
        throw Error('This item is out of stock and was removed from cart!');
      }

      if (stockWasUpdated) {
        throw Error('Stock is limited. Item quantity in cart updated!');
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError({ details: err.message });
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
      console.error(err);
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
