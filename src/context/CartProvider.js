import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultState = { id: null, items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedTotalAmount = state.totalAmount + 1;

      const itemInCartIndex = state.items.findIndex(
        (item) => item.sku === action.payload.sku
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
          ...action.payload,
          amount: 1,
        };
        updatedItems.push(addedItem);
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case 'REMOVE_ITEM': {
      const updatedTotalAmount = state.totalAmount - 1;

      const itemInCartIndex = state.items.findIndex(
        (item) =>
          item.sku === action.payload.sku && item.size === action.payload.size
      );
      const itemInCart = state.items[itemInCartIndex];

      let updatedItems;

      if (itemInCart.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.sku !== action.payload.sku
        );
      } else {
        const updatedItem = { ...itemInCart, amount: itemInCart.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[itemInCartIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case 'DELETE_ITEM': {
      const updatedTotalAmount = state.totalAmount - action.payload.amount;

      const updatedItems = state.items.filter(
        (item) => item.sku !== action.payload.sku
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, defaultState);

  const cartContext = {
    ...state,
    dispatch,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
