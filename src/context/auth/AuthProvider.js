import { useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebase/config';

import AuthContext from './auth-provider';

const initialState = {
  user: null,
  cartId: null,
  authIsReady: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_IS_READY': {
      const { user } = action.payload;
      return { ...state, user, authIsReady: true };
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

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     dispatch({ type: 'AUTH_IS_READY', payload: user });
  //   });

  //   return () => unsub();
  // }, []);

  // useEffect(() => {
  //   // Check for cartId
  // }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
