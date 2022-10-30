import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

import { auth } from '../firebase/config';
import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { updateCartAtLogin } from 'helpers/cart';

export const useLogin = () => {
  const { dispatch: dispatchAuthAction } = useAuthContext();
  const {
    dispatch: dispatchCartAction,
    id: cartId,
    items,
    totalAmount,
  } = useCartContext();

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

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      const cartRef = doc(db, 'carts', userData.cartId);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const cartData = cartDoc.data();

        if (cartId) {
          localStorage.removeItem('CART_IN_STORAGE');
          await deleteDoc(doc(db, 'carts', cartId));

          const itemsForCartUpdate = [...cartData.items, ...items];
          const updatedCart = updateCartAtLogin(itemsForCartUpdate);

          await setDoc(cartRef, updatedCart);

          dispatchCartAction({
            type: 'CREATE_CART',
            payload: { id: userData.cartId, ...updatedCart },
          });
        } else {
          dispatchCartAction({
            type: 'CREATE_CART',
            payload: { id: userData.cartId, ...cartData },
          });
        }
      } else {
        if (cartId) {
          localStorage.removeItem('CART_IN_STORAGE');

          await setDoc(cartRef, { items, totalAmount });
        }
      }

      dispatchAuthAction({ type: 'LOGIN', payload: { user, ...userData } });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };
  return { login, isLoading, error };
};
