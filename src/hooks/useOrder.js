import { useState } from 'react';

import { collection, addDoc, Timestamp } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';
import { useCheckoutContext } from './useCheckoutContext';
import { useCart } from './useCart';
import { useCheckout } from './useCheckout';

export const useOrder = () => {
  const { user } = useAuthContext();
  const { items } = useCartContext();
  const { email, shippingAddress, shippingOption } = useCheckoutContext();
  const { deleteCart } = useCart();
  const { deleteCheckoutSession } = useCheckout();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (paymentInfo) => {
    const collectionRef = collection(db, 'orders');

    try {
      setError(null);
      setIsLoading(true);
      const createdAt = Timestamp.fromDate(new Date());
      await addDoc(collectionRef, {
        createdAt,
        items,
        email,
        shippingAddress,
        shippingOption,
        paymentInfo,
        createdBy: user.uid,
      });

      await deleteCart();
      await deleteCheckoutSession();

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading, error };
};
