import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

import { auth } from 'db/config';
import { db } from 'db/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useAuth = () => {
  const { user } = useAuthContext();
  const { dispatch: dispatchCartAction } = useCartContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);
    try {
      dispatchCartAction({ type: 'IS_LOGIN' });
      const anonymousUser = user;

      const anonymousCartRef = doc(db, 'carts', anonymousUser.uid);
      const anonymousCartDoc = await getDoc(anonymousCartRef);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        throw Error('Error');
      }

      if (anonymousCartDoc.exists()) {
        deleteDoc(doc(db, 'carts', anonymousUser.uid));
      }
    } catch (err) {
      console.error(err);
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError({ details: 'User/password is incorrect!' });
      } else {
        setError(err);
      }
      dispatchCartAction({ type: 'IS_NOT_LOGIN' });
      setIsLoading(false);
    }
  };

  // const logout = async () => {
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     await signOut(auth);
  //     dispatchCartAction({ type: 'DELETE_CART' });
  //     dispatchAuthAction({ type: 'LOGOUT' });
  //   } catch (err) {
  //     console.error(err);
  //     setError(err);
  //     setIsLoading(false);
  //   }
  // };

  return { login, isLoading, error };
};
