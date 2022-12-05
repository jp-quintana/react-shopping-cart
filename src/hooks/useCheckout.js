import { useState } from 'react';

const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitShippingAddress = () => {};
  const submitShippingOption = () => {};
  const submitOrder = () => {};

  return { submitShippingAddress, submitShippingOption, submitOrder };
};

export default useCheckout;
