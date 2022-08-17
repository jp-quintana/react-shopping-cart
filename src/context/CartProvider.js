import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = { items: [], totalPrice: 0, totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = state.totalAmount + 1;
    const updatedTotalPrice = state.totalPrice + action.item.price;

    const itemInCartIndex = state.items.findIndex(
      (item) => item.sku === action.item.sku && item.size === action.item.size
    );
    const itemInCart = state.items[itemInCartIndex];

    let updatedItems = [...state.items];

    if (itemInCart) {
      const updatedItem = {
        ...itemInCart,
        amount: itemInCart.amount + 1,
      };
      updatedItems[itemInCartIndex] = updatedItem;
    } else {
      const addedItem = {
        ...action.item,
        amount: 1,
      };
      updatedItems.push(addedItem);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalPrice: updatedTotalPrice,
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    const updatedTotalAmount = state.totalAmount - 1;
    const updatedTotalPrice = state.totalPrice - action.item.price;

    const itemInCartIndex = state.items.findIndex(
      (item) => item.sku === action.item.sku && item.size === action.item.size
    );
    const itemInCart = state.items[itemInCartIndex];

    let updatedItems;

    if (itemInCart.amount === 1) {
      updatedItems = state.items.filter((item) => item.sku !== action.item.sku);
    } else {
      const updatedItem = { ...itemInCart, amount: itemInCart.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[itemInCartIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalPrice: updatedTotalPrice,
    };
  }

  if (action.type === 'DELETE_ITEM') {
    const updatedTotalAmount = state.totalAmount - action.item.amount;
    const updatedTotalPrice =
      state.totalPrice - action.item.price * action.item.amount;

    const updatedItems = state.items.filter(
      (item) => item.sku !== action.item.sku
    );

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalPrice: updatedTotalPrice,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const handleAddItem = (item) => {
    dispatchCart({
      type: 'ADD_ITEM',
      item: item,
    });
  };

  const handleRemoveItem = (item) => {
    dispatchCart({
      type: 'REMOVE_ITEM',
      item: item,
    });
  };

  const handleDeleteItem = (item) => {
    dispatchCart({
      type: 'DELETE_ITEM',
      item: item,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    deleteItem: handleDeleteItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
