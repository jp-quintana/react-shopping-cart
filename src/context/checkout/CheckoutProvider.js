import { useReducer, useEffect } from 'react';

import { doc, setDoc, getDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CheckoutContext from './checkout-context';

const initialState = {
  checkoutIsReady: false,
  currentStep: 1,
  email: null,
  id: null,
  shippingAddress: {},
  shippingOption: { standard: true, express: false },
};

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_STEP': {
      return {
        ...state,
        currentStep: action.payload,
      };
    }
    case 'SELECT_PREVIOUS_STEP': {
      return {
        ...state,
        //TODO: CHEQUEAR SI HACE FALTA PREVSTATE EN USEREDUCER
        currentStep: state.currentStep - 1,
      };
    }
    case 'SUBMIT_SHIPPING_INFO': {
      return {
        ...state,
        //TODO: CHEQUEAR SI HACE FALTA PREVSTATE EN USEREDUCER
        currentStep: state.currentStep + 1,
        email: action.payload.email,
        shippingAddress: action.payload.shippingAddress,
      };
    }
    case 'SELECT_SHIPPING_OPTION': {
      console.log('payload', action.payload);
      return {
        ...state,
        shippingOption: action.payload,
      };
    }
    case 'SUBMIT_SHIPPING_OPTION': {
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }
    case 'CREATE_CHECKOUT_SESSION': {
      return {
        ...state,
        checkoutIsReady: true,
        id: action.payload.id,
        email: action.payload.email,
      };
    }
    case 'UPDATE_CHECKOUT_SESSION': {
      return {
        ...state,
        checkoutIsReady: true,
        email: action.payload.email,
        id: action.payload.id,
        shippingAddress: action.payload.shippingAddress,
        shippingOption: action.payload.shippingOption,
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

      const checkoutSessionSnap = await getDoc(checkoutSessionRef);

      if (checkoutSessionSnap.exists()) {
        const checkoutSessionData = { ...checkoutSessionSnap.data() };

        dispatch({
          type: 'UPDATE_CHECKOUT_SESSION',
          payload: { ...checkoutSessionData, id: user.uid },
        });
      } else {
        await setDoc(checkoutSessionRef, {
          email,
          shippingAddress: {},
          shippingOption: { standard: true, express: false },
          paymentInfo: {},
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
