import { useReducer } from 'react';

import ToastContext from './toast-context';

const initialState = {
  close: null,
  content: {},
  className: '',
};

const toastReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
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
