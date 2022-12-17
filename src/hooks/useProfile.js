import { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';

export const useProfile = () => {
  const { user, dispatch } = useAuthContext();

  const userRef = doc(db, 'users', user.uid);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const editProfile = async ({ name, lastName, phoneNumber = null }) => {
    console.log(phoneNumber);
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
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { editProfile, isLoading, error };
};
