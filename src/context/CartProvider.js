import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultState = { id: null, items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedTotalAmount = state.totalAmount + 1;

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
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case 'REMOVE_ITEM': {
      const updatedTotalAmount = state.totalAmount - 1;

      const itemInCartIndex = state.items.findIndex(
        (item) => item.sku === action.item.sku && item.size === action.item.size
      );
      const itemInCart = state.items[itemInCartIndex];

      let updatedItems;

      if (itemInCart.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.sku !== action.item.sku
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
      const updatedTotalAmount = state.totalAmount - action.item.amount;

      const updatedItems = state.items.filter(
        (item) => item.sku !== action.item.sku
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

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, defaultState);

  const handleAddItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      item: item,
    });
  };

  const handleRemoveItem = (item) => {
    dispatch({
      type: 'REMOVE_ITEM',
      item: item,
    });
  };

  const handleDeleteItem = (item) => {
    dispatch({
      type: 'DELETE_ITEM',
      item: item,
    });
  };

  const cartContext = {
    ...state,
    dispatch,
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
