import { useReducer, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CartContext from './cart-context';

const initialState = {
  id: null,
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_CART': {
      console.log('running');
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
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  const { cartId: userCartId } = useAuthContext();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const getCart = async (fetchedCartId) => {
      try {
        const cartRef = doc(db, 'carts', fetchedCartId);
        const cartDoc = await getDoc(cartRef);
        //APLICAR EMPTY METHOD ACA PARA EMPROLIJAR

        const cartData = { ...cartDoc.data() };

        if (!cartData.items && !cartData.totalAmount) {
          return;
        } else {
          dispatch({
            type: 'CREATE_CART',
            payload: { id: fetchedCartId, ...cartData },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (userCartId) {
      getCart(userCartId);
    } else {
      const cartInStorageId = localStorage.getItem('CART_IN_STORAGE');
      if (cartInStorageId) {
        getCart(cartInStorageId);
      }
    }
  }, []);

  const cartContext = {
    ...state,
    dispatch,
  };

  console.log('cart', state);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
