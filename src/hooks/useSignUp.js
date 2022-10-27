import { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth } from '../firebase/config';
import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';

export const useSignUp = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async ({ name, lastName, email, password }) => {
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        throw new Error('No se pudo crear la cuenta');
      }

      const user = userCredential.user;

      const userDB = {
        name,
        lastName,
        email,
        cartId: Math.floor(Math.random() * 1000000) + 1,
        ordersId: Math.floor(Math.random() * 1000000) + 1,
      };

      await setDoc(doc(db, 'users', user.uid), userDB);

      // dispatch({ type: 'LOGIN' });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  return { signUp, error, isLoading };
};
