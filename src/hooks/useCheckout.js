import { useState } from 'react';

import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useCheckoutContext } from './useCheckoutContext';
import { useAuthContext } from './useAuthContext';

export const useCheckout = () => {
  const { dispatch } = useCheckoutContext();
  const { user } = useAuthContext();

  const checkoutSessionRef = doc(db, 'checkoutSessions', user.uid);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const selectPreviousStep = () => {
    dispatch({ type: 'SELECT_PREVIOUS_STEP' });
  };

  const selectStep = (index) => {
    dispatch({ type: 'SELECT_STEP', payload: index });
  };

  const submitShippingInfo = async (userInput) => {
    setIsLoading(true);
    const { email, ...shippingAddress } = userInput;

    await updateDoc(checkoutSessionRef, {
      email,
      shippingAddress,
    });

    setIsLoading(false);

    dispatch({
      type: 'SUBMIT_SHIPPING_INFO',
      payload: { email, shippingAddress },
    });
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
    setIsLoading(true);

    await updateDoc(checkoutSessionRef, {
      shippingOption: option,
    });

    setIsLoading(false);

    dispatch({ type: 'SUBMIT_SHIPPING_OPTION' });
  };

  const deleteCheckoutSession = async () => {
    await deleteDoc(checkoutSessionRef);
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
