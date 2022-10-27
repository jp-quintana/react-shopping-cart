import { useReducer, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth } from '../../firebase/config';
import { db } from '../../firebase/config';

import AuthContext from './auth-provider';

const initialState = {
  user: null,
  cartId: null,
  ordersId: null,
  authIsReady: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_IS_READY': {
      return {
        user: action.payload.user,
        cartId: action.payload.cartId,
        ordersId: action.payload.ordersId,
        authIsReady: true,
      };
    }
    case 'GET_CART': {
      const { cartId } = action.payload;
      return { ...state, cartId };
    }
    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, user };
    }
    case 'LOGOUT': {
      return { ...state, user: null, cartId: null };
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        const { cartId, ordersId } = docSnap.data();

        dispatch({
          type: 'AUTH_IS_READY',
          payload: { user, cartId, ordersId },
        });
      } else {
        dispatch({
          type: 'AUTH_IS_READY',
          payload: { user, cartId: null, ordersId: null },
        });
      }
    });

    return () => unsub();
  }, []);

  // useEffect(() => {
  //   // Check for cartId
  // }, []);

  console.log(state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
