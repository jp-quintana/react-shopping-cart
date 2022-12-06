import { useState } from 'react';

import { useCheckoutContext } from './useCheckoutContext';

const useCheckout = () => {
  const { dispatch } = useCheckoutContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlePreviousStep = (currentStep) => {
    dispatch({ type: 'PREVIOUS_STEP', payload: currentStep - 1 });
  };

  const handleNextStep = (currentStep) => {
    dispatch({ type: 'NEXT_STEP', payload: currentStep + 1 });
  };

  const handleSelectStep = (index) => {
    dispatch({ type: 'CURRENT_STEP', payload: index });
  };

  const submitShippingAddress = () => {};
  const submitShippingOption = () => {};
  const submitOrder = () => {};

  return {
    handlePreviousStep,
    handleNextStep,
    handleSelectStep,
    submitShippingAddress,
    submitShippingOption,
    submitOrder,
  };
};

export default useCheckout;
