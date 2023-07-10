import { useReducer, useEffect } from 'react';

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from 'db/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CheckoutContext from './checkout-context';

const initialState = {
  checkoutIsReady: false,
  currentStep: 1,
  email: null,
  id: null,
  shippingAddress: { id: null },
  shippingOption: { standard: false, expedited: false },
  shippingCost: 0,
};

const checkoutReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SELECT_STEP': {
      return {
        ...state,
        currentStep: payload,
      };
    }
    case 'SELECT_PREVIOUS_STEP': {
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }
    case 'SUBMIT_SHIPPING_INFO': {
      return {
        ...state,
        currentStep: state.currentStep + 1,
        email: payload.email,
        shippingAddress: payload.shippingAddress,
      };
    }
    case 'SELECT_SHIPPING_OPTION': {
      return {
        ...state,
        shippingOption: payload,
      };
    }
    case 'SUBMIT_SHIPPING_OPTION': {
      return {
        ...state,
        shippingCost: payload,
        currentStep: state.currentStep + 1,
      };
    }
    case 'CREATE_CHECKOUT_SESSION': {
      return {
        ...state,
        checkoutIsReady: true,
        id: payload.id,
        email: payload.email,
      };
    }
    case 'UPDATE_CHECKOUT_SESSION': {
      return {
        ...state,
        checkoutIsReady: true,
        email: payload.email,
        id: payload.id,
        shippingAddress: payload.shippingAddress,
        shippingOption: payload.shippingOption,
        shippingCost: payload.shippingCost,
      };
    }

    default: {
      return state;
    }
  }
};

const CheckoutProvider = ({ children }) => {
  const { email, user } = useAuthContext();

  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  useEffect(() => {
    const getCheckoutSession = async () => {
      const checkoutSessionRef = doc(db, 'checkoutSessions', user.uid);

      const checkoutSessionDoc = await getDoc(checkoutSessionRef);

      if (checkoutSessionDoc.exists()) {
        const checkoutSessionData = checkoutSessionDoc.data();

        const { shippingAddressId, ...formattedCheckoutData } =
          checkoutSessionData;

        formattedCheckoutData.shippingAddress = { id: shippingAddressId };

        dispatch({
          type: 'UPDATE_CHECKOUT_SESSION',
          payload: { ...formattedCheckoutData, id: user.uid },
        });
      } else {
        await setDoc(checkoutSessionRef, {
          email,
          shippingAddressId: null,
          shippingOption: { standard: false, expedited: false },
          paymentInfo: {},
          shippingCost: 0,
        });

        dispatch({
          type: 'CREATE_CHECKOUT_SESSION',
          payload: { id: user.uid, email },
        });
      }
    };

    getCheckoutSession();
  }, []);

  console.log('checkout-context', state);

  return (
    <CheckoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
