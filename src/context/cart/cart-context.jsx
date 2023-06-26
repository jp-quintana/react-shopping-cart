import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  cartIsReady: false,
  checkInventory: true,
});

export default CartContext;
