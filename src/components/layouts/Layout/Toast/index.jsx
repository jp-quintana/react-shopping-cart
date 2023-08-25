import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import ToastModal from './ToastModal';
import ToastContent from './ToastContent';

import { useToastContext } from 'hooks/useToastContext';
import { useToast } from 'hooks/useToast';

const Toast = () => {
  const { pathname } = useLocation();

  const { content, addToCart, error } = useToastContext();
  const { close } = useToast();

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    } else {
      setTimeout(() => {
        close();
      }, 100);
    }
  }, [pathname]);

  return (
    <ToastModal content={content}>
      {content && (
        <ToastContent
          content={content}
          addToCart={addToCart}
          error={error}
          close={close}
        />
      )}
    </ToastModal>
  );
};

export default Toast;
