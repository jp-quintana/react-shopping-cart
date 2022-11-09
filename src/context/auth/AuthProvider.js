import { useReducer, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth } from '../../firebase/config';
import { db } from '../../firebase/config';

import AuthContext from './auth-provider';

const initialState = {
  user: null,
  name: null,
  lastName: null,
  email: null,
  phone: null,
  cartId: null,
  ordersId: null,
  authIsReady: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_IS_READY': {
      return {
        user: action.payload.user,
        name: action.payload.name,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        cartId: action.payload.cartId,
        ordersId: action.payload.ordersId,
        authIsReady: true,
      };
    }
    case 'LOGIN': {
      return {
        ...state,
        user: action.payload.user,
        name: action.payload.name,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        cartId: action.payload.cartId,
        ordersId: action.payload.ordersId,
      };
    }
    case 'LOGOUT': {
      return {
        ...initialState,
        authIsReady: true,
      };
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
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        const userData = userDoc.data();

        dispatch({
          type: 'AUTH_IS_READY',
          payload: { user, ...userData },
        });
      } else {
        dispatch({
          type: 'AUTH_IS_READY',
          payload: {
            user: null,
            name: null,
            lastName: null,
            cartId: null,
            ordersId: null,
          },
        });
      }
    });

    return () => unsub();
  }, []);

  console.log('auth', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
