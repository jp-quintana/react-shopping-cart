import { useReducer, useEffect } from 'react';

import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth } from 'db/config';
import { db } from 'db/config';

import AuthContext from './auth-context';

const initialState = {
  user: null,
  name: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  addresses: [],
  isVerified: false,
  isAdmin: false,
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
        phoneNumber: action.payload.phoneNumber || null,
        addresses: action.payload.addresses || [],
        isVerified: true,
        isAdmin: action.payload.isAdmin || null,
        authIsReady: true,
      };
    }

    case 'ANONYMOUS_AUTH_IS_READY': {
      return {
        ...initialState,
        user: action.payload.user,
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
        phoneNumber: action.payload.phoneNumber || null,
        addresses: action.payload.addresses || [],
        isVerified: action.payload.isVerified,
        isAdmin: action.payload.isAdmin || null,
      };
    }

    case 'LOGOUT': {
      return {
        ...initialState,
      };
    }

    case 'UPDATE_USER': {
      return {
        ...state,
        ...action.payload,
      };
    }

    case 'UPDATE_ADDRESSES': {
      return {
        ...state,
        addresses: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch({
            type: 'AUTH_IS_READY',
            payload: { user, ...userData },
          });
        } else {
          dispatch({
            type: 'ANONYMOUS_AUTH_IS_READY',
            payload: { user },
          });
        }
      } else {
        await signInAnonymously(auth);
      }
    });

    return () => unsub();
  }, []);

  console.log('auth-context', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
