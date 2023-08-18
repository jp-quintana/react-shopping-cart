import { useToastContext } from 'hooks/useToastContext';

export const useToast = () => {
  const { dispatch } = useToastContext();

  const sendToast = ({ addToCart, stopCheckout, error, content }) => {
    if (addToCart) {
      dispatch({ type: 'ADD_TO_CART', payload: content });
    }

    if (stopCheckout) {
      dispatch({ type: 'STOP_CHECKOUT', payload: content });
    }

    if (error) {
      dispatch({ type: 'ERROR', payload: content });
    }
  };

  const close = () => {
    dispatch({ type: 'CLOSE' });
  };

  return { sendToast, close };
};
