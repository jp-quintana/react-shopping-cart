import { createContext } from 'react';

const ToastContext = createContext({
  addToCart: false,
  error: false,
  content: null,
  // className: '',
});

export default ToastContext;
