import { useReducer, useEffect } from 'react';

import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

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
    case 'SUBMIT_SHIPPING_OPTION': {
      return {
        ...state,
        currentStep: state.currentStep + 1,
        shippingOption: action.payload,
      };
    }
    case 'CREATE_CHECKOUT_SESSION': {
      return {
        ...state,
        checkoutIsReady: true,
        id: action.payload,
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
    default:
      return state;
  }
};

const CheckoutProvider = ({ children }) => {
  const {
    user,
    checkoutSessionId,
    dispatch: dispatchAuthAction,
  } = useAuthContext();

  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  useEffect(() => {
    if (!checkoutSessionId) {
      const createCheckoutSession = async (newId) => {
        const userRef = doc(db, 'users', user.uid);
        const checkoutSessionRef = doc(db, 'checkoutSessions', newId);

        await updateDoc(userRef, {
          checkoutSessionId: newId,
        });
        await setDoc(checkoutSessionRef, {
          shippingAddress: {},
          shippingOption: {},
          paymentInfo: {},
        });

        dispatchAuthAction({ type: 'NEW_CHECKOUT_SESSION_ID', payload: newId });
        dispatch({ type: 'CREATE_CHECKOUT_SESSION', payload: newId });
      };

      const newCheckoutSessionId = (
        Math.floor(Math.random() * 10000000) + 1
      ).toString();

      createCheckoutSession(newCheckoutSessionId);
    } else if (!state.checkoutIsReady) {
      const getCheckoutSession = async () => {
        const checkoutSessionRef = doc(
          db,
          'checkoutSessions',
          checkoutSessionId
        );
        const checkoutSessionDoc = await getDoc(checkoutSessionRef);

        const checkoutSessionData = { ...checkoutSessionDoc.data() };

        dispatch({
          type: 'UPDATE_CHECKOUT_SESSION',
          payload: { ...checkoutSessionData, id: checkoutSessionId },
        });
      };

      getCheckoutSession();
    }
  }, []);

  console.log('checkout-context', state);

  return (
    <CheckoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
