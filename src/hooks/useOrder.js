import { useState } from 'react';

import { doc, addDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';

export const useOrder = () => {
  const { ordersId } = useAuthContext();

  const ordersRef = db();

  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (order) => {};

  return { createOrder };
};
