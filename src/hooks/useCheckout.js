import { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../firebase/config';

import { useCheckoutContext } from './useCheckoutContext';
import { useAuthContext } from './useAuthContext';

export const useCheckout = () => {
  const { dispatch } = useCheckoutContext();
  const { checkoutSessionId } = useAuthContext();

  const checkoutSessionRef = doc(db, 'checkoutSessions', checkoutSessionId);

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

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

  const submitShippingOption = (option) => {
    dispatch({ type: 'SUBMIT_SHIPPING_OPTION', payload: option });
  };

  const submitOrder = () => {};

  return {
    selectPreviousStep,
    selectStep,
    submitShippingInfo,
    selectShippingOption,
    submitShippingOption,
    submitOrder,
    isLoading,
    // error,
  };
};
