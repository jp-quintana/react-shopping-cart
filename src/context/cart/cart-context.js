import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  totalAmount: 0,
});

export default CartContext;
