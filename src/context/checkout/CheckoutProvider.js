import { useReducer, useEffect } from 'react';

import { doc, updateDoc, setDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CheckoutContext from './checkout-context';

const initialState = {
  checkoutIsReady: false,
  id: null,
  currentStep: 1,
  shippingAddress: {},
  shippingOption: {},
  paymentInfo: {},
};

const checkoutReducer = (state, action) => {
  switch (action.type) {
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
      console.log('working');
      const createCheckoutSession = async (newId) => {
        console.log('user', user.uid);
        console.log('newId', newId);
        const userRef = doc(db, 'users', user.uid);
        const checkoutSessionRef = doc(db, 'checkoutSessions', newId);

        await updateDoc(userRef, {
          checkoutSessionId: newId,
        });
        console.log('prueba');
        await setDoc(checkoutSessionRef, {
          shippingAddress: {},
          shippingOption: {},
          paymentInfo: {},
        });

        dispatchAuthAction({ type: 'NEW_CHECKOUT_SESSION_ID', payload: newId });
        // dispatch({type: 'CREATE_CHECKOUT_SESSION', payload: newId})
      };

      const newCheckoutSessionId = (
        Math.floor(Math.random() * 10000000) + 1
      ).toString();

      console.log(newCheckoutSessionId);

      createCheckoutSession(newCheckoutSessionId);
    } else {
      const fetchCheckoutSession = async () => {};

      fetchCheckoutSession();
    }
  }, []);

  return (
    <CheckoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
