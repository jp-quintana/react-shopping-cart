import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

import { auth } from '../firebase/config';
import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useSignUp = () => {
  const { user: anonymousUser, dispatch } = useAuthContext();
  const { id: cartId, items, totalAmount } = useCartContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async ({ name, lastName, email, password }) => {
    setError(null);
    setIsLoading(true);

    try {
      const credential = EmailAuthProvider.credential(email, password);

      const userCredential = await linkWithCredential(
        auth.currentUser,
        credential
      );

      if (!userCredential) {
        throw new Error('No se pudo crear la cuenta');
      }

      const user = userCredential.user;

      let userCartId;

      const anonymouseCartRef = doc(db, 'carts', anonymousUser.uid);
      const anonymousCartDoc = await getDoc(anonymouseCartRef);

      if (anonymousCartDoc.exists()) {
        await deleteDoc(doc(db, 'carts', anonymousUser.uid));
        await setDoc(doc(db, 'carts', user.uid), { items, totalAmount });
      }

      const userData = {
        name,
        lastName,
        email,
        isVerified: true,
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      dispatch({ type: 'LOGIN', payload: { user, ...userData } });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { signUp, error, isLoading };
};
