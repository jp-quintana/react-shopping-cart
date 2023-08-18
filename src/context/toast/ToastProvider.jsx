import { useReducer } from 'react';

import ToastContext from './toast-context';

const initialState = {
  addToCart: false,
  stopCheckout: false,
  error: false,
  content: null,
};

const toastReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART': {
      return {
        ...initialState,
        addToCart: true,
        content: payload,
      };
    }
    case 'STOP_CHECKOUT': {
      return {
        ...initialState,
        stopCheckout: true,
        error: true,
        content: payload,
      };
    }
    case 'ERROR': {
      return { ...initialState, error: true, content: payload };
    }
    case 'CLOSE': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  return (
    <ToastContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
