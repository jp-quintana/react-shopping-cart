import { useState } from 'react';

import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useCheckoutContext } from './useCheckoutContext';
import { useAuthContext } from './useAuthContext';
import { useAddress } from './useAddress';

export const useCheckout = () => {
  const { dispatch } = useCheckoutContext();
  const { user, addresses } = useAuthContext();
  const { createAddress } = useAddress();

  const checkoutSessionRef = doc(db, 'checkoutSessions', user.uid);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectPreviousStep = () => {
    dispatch({ type: 'SELECT_PREVIOUS_STEP' });
  };

  const selectStep = (index) => {
    dispatch({ type: 'SELECT_STEP', payload: index });
  };

  const submitShippingInfo = async (userInput) => {
    setError(null);
    setIsLoading(true);
    try {
      const { email, ...shippingAddress } = userInput;

      if (shippingAddress.isNew) {
        shippingAddress.id = addresses.length + 1;
        delete shippingAddress.isNew;
        await createAddress(shippingAddress);
      }

      await updateDoc(checkoutSessionRef, {
        email,
        shippingAddress,
      });

      dispatch({
        type: 'SUBMIT_SHIPPING_INFO',
        payload: { email, shippingAddress },
      });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const selectShippingOption = (option) => {
    let selectedOption;
    if (option === 'standard') {
      selectedOption = {
        standard: true,
        express: false,
      };
    } else {
      selectedOption = {
        standard: false,
        express: true,
      };
    }

    dispatch({ type: 'SELECT_SHIPPING_OPTION', payload: selectedOption });
  };

  const submitShippingOption = async (option) => {
    setError(null);
    setIsLoading(true);
    try {
      await updateDoc(checkoutSessionRef, {
        shippingOption: option,
      });

      dispatch({ type: 'SUBMIT_SHIPPING_OPTION' });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const deleteCheckoutSession = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await deleteDoc(checkoutSessionRef);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return {
    selectPreviousStep,
    selectStep,
    submitShippingInfo,
    selectShippingOption,
    submitShippingOption,
    deleteCheckoutSession,
    isLoading,
    error,
  };
};
