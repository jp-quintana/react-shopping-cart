export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
  const date = value.toDate().getDate();
  const month = value.toDate().getMonth() + 1;
  const year = value.toDate().getFullYear().toString().slice(-2);

  return `${date}/${month}/${year}`;
};
