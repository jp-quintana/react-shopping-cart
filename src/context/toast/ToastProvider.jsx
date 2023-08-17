import { useReducer } from 'react';

import ToastContext from './toast-context';

const initialState = {
  addToCart: false,
  error: false,
  content: null,
  // className: '',
};

const toastReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART': {
      return { addToCart: true, error: false, content: payload };
    }
    case 'ERROR': {
      return { addToCart: false, error: true, content: payload };
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
