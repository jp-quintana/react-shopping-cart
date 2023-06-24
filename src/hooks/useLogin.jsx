import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

import { auth } from 'db/config';
import { db } from 'db/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { updateCartAtLogin } from 'helpers/cart';

export const useLogin = () => {
  const { user: anonymousUser } = useAuthContext();
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

      const anonymousCartRef = doc(db, 'carts', anonymousUser.uid);
      const anonymousCartDoc = await getDoc(anonymousCartRef);

      if (cartDoc.exists()) {
        const cartData = cartDoc.data();

        if (anonymousCartDoc.exists()) {
          await deleteDoc(doc(db, 'carts', anonymousUser.uid));

          const itemsForCartUpdate = [...cartData.items, ...items];
          const updatedCart = updateCartAtLogin(itemsForCartUpdate);

          await setDoc(cartRef, updatedCart);

          dispatchCartAction({
            type: 'UPDATE_CART',
            payload: { ...updatedCart },
          });
        } else {
          dispatchCartAction({
            type: 'UPDATE_CART',
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
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError({ details: 'Usario o contraseña incorrecta.' });
      } else {
        setError(err);
      }
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
