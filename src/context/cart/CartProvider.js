import { useReducer, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CartContext from './cart-context';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CART': {
      return {
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
  const { user } = useAuthContext();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
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
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCart();
  }, []);

  console.log('cart-context', state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
