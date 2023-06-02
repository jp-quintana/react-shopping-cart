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

import { db } from 'db/config';

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

  const ordersRef = collection(db, 'orders');

  const createOrder = async (paymentInfo) => {
    setError(null);
    setIsLoading(true);
    try {
      const batch = writeBatch(db);

      for (const item of items) {
        const skuRef = doc(db, 'inventory', item.id);
        batch.update(skuRef, { stock: increment(-item.amount) });
      }

      await batch.commit();

      const createdAt = Timestamp.fromDate(new Date());
      await addDoc(ordersRef, {
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

  const getOrders = async () => {
    setError(null);

    try {
      const orders = [];

      const q = query(
        ordersRef,
        where('createdBy', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return orders;
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return { createOrder, getOrders, isLoading, error };
};
