import moment from 'moment';

export const formatPrice = (number) => {
  // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return number + '.00';
};

export const formatDiscount = ({ currentPrice, actualPrice }) => {
  const discountPercentage = Math.round(
    (currentPrice / actualPrice - 1) * -100
  );
  const roundedDiscountPercentage = Math.round(discountPercentage / 5) * 5;
  return '-' + roundedDiscountPercentage + '%';

  // return '-' + Math.round((currentPrice / actualPrice - 1) * -100) + '%';
};

export const formatDiscountNumber = ({ currentPrice, actualPrice }) => {
  const discountPercentage = Math.round(
    (currentPrice / actualPrice - 1) * -100
  );
  const roundedDiscountPercentage = Math.round(discountPercentage / 5) * 5;
  return Math.abs(roundedDiscountPercentage);

  // return '-' + Math.round((currentPrice / actualPrice - 1) * -100) + '%';
};

export const formatCardNumber = (value) => {
  // if (e.target.value.length < 20) {
  //   const input = e.target.value
  //     .replace(/[^\d]/g, '')
  //     // .replace(/[^0-9\\.]+/g, '')
  //     // .replace(/[^0-9\.]+/g, '')
  //     .replace(/(.{4})/g, '$1 ')
  //     .trim();
  //   setCardNumberInput(input);
  // }
  const v = value.replace(/[^0-9]/gi, '').substr(0, 16);

  const parts = [];
  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.substr(i, 4));
  }
  return parts.length > 1 ? parts.join(' ') : value;
};

export const formatExpiryDate = (value) => {
  const expiryDate = value;

  const expiryDateFormatted =
    expiryDate.replace(/[^\d]/g, '').substring(0, 2) +
    (expiryDate.length > 2 ? '/' : '') +
    expiryDate.replace(/[^\d]/g, '').substring(2, 4);

  return expiryDateFormatted;
};

export const formatCvv = (value) => {
  const cvv = value;

  const cvvFormatted = cvv.replace(/[^\d]/g, '').substring(0, 3);

  return cvvFormatted;
};

export const formatDate = (value) => {
  const timestamp = `${value.seconds}.${value.nanoseconds}`;

  return moment.unix(parseFloat(timestamp)).format('MM/DD/YY');
};
