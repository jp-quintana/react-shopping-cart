import ToastProvider from 'context/toast/ToastProvider';
import AuthProvider from 'context/auth/AuthProvider';
import CartProvider from 'context/cart/CartProvider';

const Provider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default Provider;
