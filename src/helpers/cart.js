import { formatNumber } from './format';

export const cartTotal = (items) => {
  let total = 0;

  items.forEach((item) => (total += item.price * item.amount));

  return formatNumber(total);
};

export const itemTotal = ({ price, amount }) => {
  return formatNumber(price * amount);
};
