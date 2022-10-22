import { formatNumber } from './format';

export const itemTotal = ({ price, amount }) => {
  return formatNumber(price * amount);
};

export const addCartTotal = (items) => {
  let total = 0;

  items.forEach((item) => (total += item.price * item.amount));

  return formatNumber(total);
};
