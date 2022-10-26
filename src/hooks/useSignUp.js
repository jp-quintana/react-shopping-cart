import { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';

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

      const user = userCredential.user;
      console.log(user);

      // dispatch({ type: 'LOGIN' });
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  return { signUp, error, isLoading };
};
