import { createContext } from 'react';

const CheckoutContext = createContext({
  checkoutIsReady: false,
  currentStep: 1,
  email: null,
  id: null,
  shippingAddress: {},
  shippingOption: { standard: true, expedited: false },
});

export default CheckoutContext;
