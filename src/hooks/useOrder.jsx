import { useState } from 'react';

import moment from 'moment';

import {
  writeBatch,
  doc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  increment,
} from 'firebase/firestore';

import { db } from 'db/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';
import { useCheckoutContext } from './useCheckoutContext';
import { useCart } from './useCart';
import { useCheckout } from './useCheckout';

import { handleError } from 'helpers/error/handleError';

export const useOrder = () => {
  const { user } = useAuthContext();
  const { items } = useCartContext();
  const { email, shippingAddress, shippingOption, shippingCost } =
    useCheckoutContext();
  const { deleteCart } = useCart();
  const { deleteCheckoutSession } = useCheckout();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const ordersRef = collection(db, 'orders');

  const createOrder = async (paymentInfo, billingAddress) => {
    setError(null);
    setIsLoading(true);
    try {
      const batch = writeBatch(db);

      for (const item of items) {
        const skuRef = doc(
          collection(db, 'products', item.productId, 'skus'),
          item.skuId
        );
        batch.update(skuRef, { quantity: increment(-item.quantity) });
      }

      await batch.commit();

      await addDoc(ordersRef, {
        createdAt: moment().toDate(),
        items,
        email,
        shippingAddress,
        shippingOption,
        shippingCost,
        paymentInfo,
        billingAddress,
        createdBy: user.uid,
      });

      await deleteCart();
      await deleteCheckoutSession();

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(handleError(err));
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
      console.error(err);
      setError(handleError(err));
    }
  };

  return { createOrder, getOrders, isLoading, error };
};
