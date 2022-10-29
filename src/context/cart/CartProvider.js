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
    case 'NEW_CART': {
      return {
        id: action.payload.id,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      };
    }
    case 'UPDATE_CART': {
      return {
        ...state,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      };
    }
    case 'DELETE_CART': {
      return {
        ...defaultState,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  // const { cartId } = useAuthContext();
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
            type: 'NEW_CART',
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
