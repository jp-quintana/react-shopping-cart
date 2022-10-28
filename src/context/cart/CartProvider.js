import { useReducer, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CartContext from './cart-context';

const defaultState = {
  id: null,
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART': {
      return {
        id: action.payload.id,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      };
    }
    case 'ADD_ITEM': {
      // const updatedTotalAmount = state.totalAmount + 1;
      // const itemInCartIndex = state.items.findIndex(
      //   (item) => item.sku === action.payload.sku
      // );
      // const itemInCart = state.items[itemInCartIndex];
      // let updatedItems = [...state.items];
      // if (itemInCart) {
      //   const updatedItem = {
      //     ...itemInCart,
      //     amount: itemInCart.amount + 1,
      //   };
      //   updatedItems[itemInCartIndex] = updatedItem;
      // } else {
      //   const addedItem = {
      //     ...action.payload,
      //     amount: 1,
      //   };
      //   updatedItems.push(addedItem);
      // }
      // return {
      //   ...state,
      //   items: updatedItems,
      //   totalAmount: updatedTotalAmount,
      // };

      return {
        id: action.payload.id,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      };
    }

    case 'REMOVE_ITEM': {
      const updatedTotalAmount = state.totalAmount - 1;

      const itemInCartIndex = state.items.findIndex(
        (item) =>
          item.sku === action.payload.sku && item.size === action.payload.size
      );
      const itemInCart = state.items[itemInCartIndex];

      let updatedItems;

      if (itemInCart.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.sku !== action.payload.sku
        );
      } else {
        const updatedItem = { ...itemInCart, amount: itemInCart.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[itemInCartIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case 'DELETE_ITEM': {
      const updatedTotalAmount = state.totalAmount - action.payload.amount;

      const updatedItems = state.items.filter(
        (item) => item.sku !== action.payload.sku
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  const { cartId } = useAuthContext();
  const [state, dispatch] = useReducer(cartReducer, defaultState);

  useEffect(() => {
    const cartInStorageId = localStorage.getItem('CART_IN_STORAGE');

    if (cartInStorageId) {
      const getCart = async () => {
        try {
          const docRef = doc(db, 'carts', cartInStorageId);
          const docSnap = await getDoc(docRef);

          const cart = docSnap.data();

          dispatch({
            type: 'LOAD_CART',
            payload: { ...cart, id: cartInStorageId },
          });
        } catch (err) {
          console.log(err);
        }
      };

      getCart();
    }
  }, []);
  // useEffect(() => {
  //   if (cartId) {
  //     const getCart = async () => {
  //       const docRef = doc(db, 'carts', cartId);
  //       const docSnap = await getDoc(docRef);
  //       return docSnap.data();
  //     };

  //     const cart = getCart();
  //     dispatch({ type: 'LOAD_CART_DB', payload: { ...cart } });
  //   }
  // }, [cartId]);

  const cartContext = {
    ...state,
    dispatch,
  };

  console.log(state);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
