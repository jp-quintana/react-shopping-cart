import { createContext } from 'react';

const ToastContext = createContext({
  message: '',
});

export default ToastContext;
