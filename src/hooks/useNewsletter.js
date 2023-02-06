import { useState } from 'react';

import {
  writeBatch,
  doc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  Timestamp,
  increment,
} from 'firebase/firestore';

import { db } from '../firebase/config';

export const useNewsletter = () => {
  const newsletterRef = collection(db, 'newsletter');

  const [error, setError] = useState(null);

  const subscribeToNewsletter = async ({ email }) => {
    setError(null);

    try {
      // const checkForEmail = [];

      const q = query(newsletterRef, where('email', '==', email));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.isEmpty()) {
        console.log('test');
      }

      // querySnapshot.forEach((doc) => {
      //   orders.push({ id: doc.id, ...doc.data() });
      // });
    } catch (err) {}
  };

  return { subscribeToNewsletter, error };
};
