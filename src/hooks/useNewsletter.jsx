import { useState } from 'react';

import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

import { db } from 'db/config';

import { handleError } from 'helpers/error/handleError';

export const useNewsletter = () => {
  const newsletterRef = collection(db, 'newsletter');

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const subscribeToNewsletter = async ({ email }) => {
    setError(null);
    try {
      const q = query(newsletterRef, where('email', '==', email));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(newsletterRef, { email });

        setSuccess({ message: 'Thanks for joining!' });
      } else {
        setSuccess({ message: 'You have already joined!' });
      }
    } catch (err) {
      console.error(err);
      setError(handleError(err));
    }
  };

  return { subscribeToNewsletter, success, error };
};
