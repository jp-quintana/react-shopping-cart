import { useState } from 'react';

import { signOut } from 'firebase/auth';

import { auth } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useLogout = () => {
  const { dispatch: dispatchAuthAction } = useAuthContext();
  const { dispatch: dispatchCartAction } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signOut(auth);
      dispatchCartAction({ type: 'DELETE_CART' });
      dispatchAuthAction({ type: 'LOGOUT' });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};
