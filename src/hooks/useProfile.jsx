import { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';

import { db } from 'db/config';

import { useAuthContext } from './useAuthContext';

import { handleError } from 'helpers/error/handleError';

export const useProfile = () => {
  const { user, dispatch } = useAuthContext();

  const userRef = doc(db, 'users', user.uid);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const editProfile = async ({ name, lastName, phoneNumber = null }) => {
    setError(null);
    setIsLoading(true);
    try {
      await updateDoc(userRef, {
        name,
        lastName,
        phoneNumber,
      });

      dispatch({
        type: 'UPDATE_USER',
        payload: { name, lastName, phoneNumber },
      });

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(handleError(err));
      setIsLoading(false);
    }
  };

  return { editProfile, isLoading, error };
};
