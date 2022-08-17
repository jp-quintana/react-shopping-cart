import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  totalPrice: 0,
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (item) => {},
  deleteItem: (item) => {},
});

export default CartContext;
