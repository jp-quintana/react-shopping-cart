import { useReducer, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CartContext from './cart-context';

const initialState = {
  items: [],
  totalAmount: 0,
  cartIsReady: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_IS_READY': {
      return {
        ...state,
        cartIsReady: true,
      };
    }
    case 'UPDATE_CART': {
      return {
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        cartIsReady: true,
      };
    }
    case 'DELETE_CART': {
      return {
        ...initialState,
        cartIsReady: true,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (user) {
      const getCart = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);

          if (cartDoc.exists()) {
            const cartData = { ...cartDoc.data() };
            dispatch({
              type: 'UPDATE_CART',
              payload: { ...cartData },
            });
          } else {
            dispatch({
              type: 'CART_IS_READY',
            });
          }
        } catch (err) {
          console.log(err);
        }
      };

      getCart();
    }
  }, [user]);

  console.log('cart-context', state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
