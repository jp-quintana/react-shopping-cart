import { formatPrice } from './format';

export const addIndividualItemPrice = ({ price, quantity }) => {
  return formatPrice(price * quantity);
};

export const addAllItemsPrice = (items) => {
  return formatPrice(
    items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
  );
};

export const addAllItemsPriceNumber = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
};

export const addAllItemsQuantity = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};
