import { useState } from 'react';

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';

export const useOrder = () => {
  const { ordersId } = useAuthContext();

  const ordersRef = doc(db, 'orders', ordersId);

  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (paymentInfo) => {
    try {
      const createdAt = Timestamp.fromDate(new Date());
      // await updateDoc(ordersRef, {
      //   list: arrayUnion({
      //     createdAt,
      //     name: 'Juan',
      //   }),
      // });
      // const orderDoc = await getDoc(ordersRef);
      // const ordersData = orderDoc.data();
      // console.log(ordersData);
      //   setDoc(
      //     ordersRef,
      //     {
      //       list: [
      //         {
      //           name: 'Juan',
      //         },
      //       ],
      //     },
      //     { merge: true }
      //   );
      setDoc(
        ordersRef,
        {
          list: arrayUnion({
            createdAt,
            name: 'Juan',
          }),
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return { createOrder };
};
