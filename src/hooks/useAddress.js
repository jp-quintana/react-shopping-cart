import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuthContext } from 'hooks/useAuthContext';

export const useAddress = () => {
  const { user, addresses, dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userRef = doc(db, 'users', user.uid);

  const userAddresses = [...addresses];

  const createAddress = async ({
    name,
    lastName,
    phoneNumber,
    address,
    zipCode,
    city,
    province,
    isMain = null,
    existingId = null,
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      // TODO: PARA EL SELECT EN EL CHECKOUT EN UN FUTURO!!!
      if (existingId) {
        setIsLoading(false);
        return;
      }

      if (!isMain) {
        userAddresses.length === 0 ? (isMain = true) : (isMain = null);
      }

      const addressToAdd = {
        name,
        lastName,
        phoneNumber,
        address,
        zipCode,
        city,
        province,
        isMain,
      };

      if (isMain && addresses.length > 0) {
        const currentMainAddressIndex = userAddresses.findIndex(
          (address) => address.isMain
        );

        userAddresses[currentMainAddressIndex].isMain = false;

        userAddresses.unshift(addressToAdd);
      } else {
        userAddresses.push(addressToAdd);
      }

      for (let i = 1; i <= userAddresses.length; i++) {
        userAddresses[i - 1].id = i;
      }

      await updateDoc(userRef, {
        addresses: userAddresses,
      });

      dispatch({ type: 'UPDATE_ADDRESSES', payload: userAddresses });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const editAddress = () => {};

  const deleteAddress = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedAddresses = userAddresses.filter(
        (address) => address.id !== id
      );

      console.log(updatedAddresses);

      for (let i = 1; i <= updatedAddresses.length; i++) {
        updatedAddresses[i - 1].id = i;
      }

      const checkForMain = updatedAddresses.find((address) => address.isMain);

      if (!checkForMain) {
        updatedAddresses[0].isMain = true;
      }

      await updateDoc(userRef, {
        addresses: updatedAddresses,
      });

      dispatch({ type: 'UPDATE_ADDRESSES', payload: updatedAddresses });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { createAddress, editAddress, deleteAddress, isLoading, error };
};
