import { useContext } from 'react';

import ToastContext from 'context/toast/toast-context';

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error('useToastContext hook must be used inside ToastProvider');
  }

  return context;
};
