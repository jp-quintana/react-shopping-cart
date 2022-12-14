import { useReducer, useEffect } from 'react';

import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
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
  isVerified: false,
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
        phone: action.payload.phone || null,
        isVerified: true,
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
        phone: action.payload.phone || null,
        isVerified: action.payload.isVerified,
      };
    }

    case 'LOGOUT': {
      return {
        ...initialState,
        authIsReady: true,
      };
    }

    default: {
      return state;
    }
  }
};

console.log('render');

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      // console.log('running');
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
          console.log('running', user.uid);

          console.log('Dispatching anonymously');
          dispatch({
            type: 'ANONYMOUS_AUTH_IS_READY',
            payload: { user },
          });
        }
      } else {
        console.log('Sigining in anonymously');
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
