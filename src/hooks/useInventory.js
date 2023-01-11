import { useState } from 'react';

import {
  doc,
  collection,
  query,
  where,
  deleteDoc,
  documentId,
  getDocs,
} from 'firebase/firestore';

import { db } from '../firebase/config';

export const useInventory = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const inventoryRef = collection(db, 'inventory');

  const checkInventory = async (items) => {
    console.log(items);
    setError(null);
    setIsLoading(true);
    try {
      const idList = items.map((item) => item.id);

      const skus = [];

      while (idList.length) {
        const batch = idList.splice(0, 10);
        const q = query(inventoryRef, where(documentId(), 'in', [...batch]));
        const inventorySnapshot = await getDocs(q);

        inventorySnapshot.forEach((doc) => {
          skus.push({ id: doc.id, ...doc.data() });
        });
      }

      const stockDifference = [];

      // TODO: TERMINAR ESTO
      const updatedItems = [...items];

      for (const item of items) {
        const { stock } = skus.find((sku) => sku.id === item.id);

        if (stock === 0) {
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { checkInventory };
};

export default useInventory;
