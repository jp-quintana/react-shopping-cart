import { createContext } from 'react';

const CartContext = createContext({
  items: [],
});

export default CartContext;
