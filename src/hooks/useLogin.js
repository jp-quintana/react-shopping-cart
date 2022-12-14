import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

import { auth } from '../firebase/config';
import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { updateCartAtLogin } from 'helpers/cart';

export const useLogin = () => {
  const { user: anonymousUser, dispatch: dispatchAuthAction } =
    useAuthContext();
  const { dispatch: dispatchCartAction, items, totalAmount } = useCartContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        throw new Error('Error');
      }

      const user = userCredential.user;

      const cartRef = doc(db, 'carts', user.uid);
      const cartDoc = await getDoc(cartRef);

      const anonymouseCartRef = doc(db, 'carts', anonymousUser.uid);
      const anonymousCartDoc = await getDoc(anonymouseCartRef);

      if (cartDoc.exists()) {
        const cartData = cartDoc.data();

        if (anonymousCartDoc.exists()) {
          await deleteDoc(doc(db, 'carts', anonymousUser.uid));

          const itemsForCartUpdate = [...cartData.items, ...items];
          const updatedCart = updateCartAtLogin(itemsForCartUpdate);

          await setDoc(cartRef, updatedCart);

          dispatchCartAction({
            type: 'CREATE_CART',
            payload: { ...updatedCart },
          });
        } else {
          dispatchCartAction({
            type: 'CREATE_CART',
            payload: { ...cartData },
          });
        }
      } else {
        if (anonymousCartDoc.exists()) {
          await deleteDoc(doc(db, 'carts', anonymousUser.uid));

          await setDoc(cartRef, { items, totalAmount });
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
