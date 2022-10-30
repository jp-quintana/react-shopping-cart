import { formatNumber } from './format';

export const itemTotal = ({ price, amount }) => {
  return formatNumber(price * amount);
};

export const addCartTotal = (items) => {
  let total = 0;

  items.forEach((item) => (total += item.price * item.amount));

  return formatNumber(total);
};

export const updateCartAtLogin = (items) => {
  let updatedItems = [];
  let updatedTotalAmount = 0;

  items.forEach((item) => {
    updatedTotalAmount += item.amount;

    const itemInCartIndex = updatedItems.findIndex((i) => i.sku === item.sku);

    if (itemInCartIndex >= 0) {
      updatedItems[itemInCartIndex].amount += item.amount;
    } else {
      updatedItems.push(item);
    }
  });

  return { items: updatedItems, totalAmount: updatedTotalAmount };
};
