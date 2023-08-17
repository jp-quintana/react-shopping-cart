import { createContext } from 'react';

const ToastContext = createContext({
  close: () => {},
  content: {},
  className: '',
});

export default ToastContext;
