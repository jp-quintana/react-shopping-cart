import { useState } from 'react';

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
    isMain = false,
    existingId = null,
    isFromCheckout = null,
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      // TODO: PARA EL SELECT EN EL CHECKOUT EN UN FUTURO!!!
      if (existingId) {
        setIsLoading(false);
        return;
      }
      if (isFromCheckout) {
        isMain = true;
      }

      if (!isMain) {
        userAddresses.length === 0 ? (isMain = true) : (isMain = false);
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
        label: `${address} - ${city}, ${zipCode} - ${province}`,
        value: address,
      };

      if (isMain && userAddresses.length > 0) {
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

  const editAddress = async ({
    name,
    lastName,
    phoneNumber,
    address,
    zipCode,
    city,
    province,
    isMain,
    id,
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      if (!isMain) {
        const currentAddressIndex = userAddresses.findIndex(
          (address) => address.id === id
        );

        userAddresses[currentAddressIndex].isMain
          ? (isMain = true)
          : (isMain = false);
      }

      const updatedAddress = {
        name,
        lastName,
        phoneNumber,
        address,
        zipCode,
        city,
        province,
        isMain,
      };

      let updatedAddresses = [...userAddresses];

      if (isMain) {
        updatedAddresses = userAddresses.filter((address) => address.id !== id);

        const currentMainAddressIndex = updatedAddresses.findIndex(
          (address) => address.isMain
        );

        if (currentMainAddressIndex >= 0) {
          updatedAddresses[currentMainAddressIndex].isMain = false;
        }

        updatedAddresses.unshift(updatedAddress);

        for (let i = 1; i <= updatedAddresses.length; i++) {
          updatedAddresses[i - 1].id = i;
        }
      } else {
        const addressToEditIndex = updatedAddresses.findIndex(
          (address) => address.id === id
        );

        updatedAddresses[addressToEditIndex] = {
          ...updatedAddress,
          id,
        };
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

  const deleteAddress = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      const updatedAddresses = userAddresses.filter(
        (address) => address.id !== id
      );

      if (updatedAddresses.length > 0) {
        for (let i = 1; i <= updatedAddresses.length; i++) {
          updatedAddresses[i - 1].id = i;
        }

        const checkForMain = updatedAddresses.find((address) => address.isMain);

        if (!checkForMain) {
          updatedAddresses[0].isMain = true;
        }
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
