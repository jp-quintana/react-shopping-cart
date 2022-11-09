import { formatNumber } from './format';

export const addItemPrice = ({ price, amount }) => {
  return formatNumber(price * amount);
};

export const addAllItemsPrice = (items) => {
  let total = 0;

  items.forEach((item) => (total += item.price * item.amount));

  return formatNumber(total);
};

export const addAllItemsAmount = (items) => {
  let total = 0;

  items.forEach((item) => (total += item.amount));

  return formatNumber(total);
};
