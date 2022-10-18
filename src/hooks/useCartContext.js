import { useContext } from 'react';
import CartContext from '../context/cart-context';

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error('useAuthContext must be inside an AuthContextProvider');
  }

  return context;
};

export default useCartContext;
