import { useState } from 'react';

import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

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

        setSuccess({ content: 'Gracias por unirte!' });
      } else {
        setSuccess({ content: 'Ya estas unido!' });
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return { subscribeToNewsletter, success, error };
};
