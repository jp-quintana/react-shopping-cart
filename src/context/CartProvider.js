import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {};

const cartReducer = (item, id) => {};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const handleAddItem = (item) => {};

  const handleRemoveItem = (item) => {};

  const cartContext = {
    items: [],
    totalPrice: 0,
    totalAmount: 0,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
