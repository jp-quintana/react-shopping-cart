import { useContext } from 'react';

import CheckoutContext from 'context/checkout/checkout-context';

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw Error('useCheckoutContext hook must be used inside CheckoutProvider');
  }

  return context;
};
