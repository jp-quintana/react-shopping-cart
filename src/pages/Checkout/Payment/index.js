import { useState } from 'react';

import styles from './index.module.scss';

const Payment = () => {
  const [paymentOption, setPaymentOption] = useState('creditCard');

  const [cardNumberInput, setCardNumberInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [expireDateInput, setExpireDateInput] = useState('');

  const handleCardNumberInputChange = (e) => {
    if (e.target.value.length < 20) {
      const input = e.target.value
        .replace(/[^\d]/g, '')
        // .replace(/[^0-9\\.]+/g, '')
        // .replace(/[^0-9\.]+/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
      setCardNumberInput(input);
    }
  };

  const handleExpireDateInput = (e) => {};

  const cardNumberStyles = {
    label:
      cardNumberInput.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      cardNumberInput.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const nameStyles = {
    label: nameInput.length > 0 ? styles.label_focus : styles.label_no_focus,
    input: nameInput.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const expireDateStyles = {
    label:
      expireDateInput.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      expireDateInput.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  return (
    <div>
      <form className={styles.form}>
        <h2 className={styles.title}>Forma de Pago</h2>
        <div className={styles.payment_options_wrapper}>
          <div>
            <label className={styles.payment_option}>
              <input
                type="radio"
                value="creditCard"
                checked={paymentOption === 'creditCard'}
                onChange={(e) => setPaymentOption(e.target.value)}
                className={
                  paymentOption === 'creditCard'
                    ? styles.radio_selected
                    : styles.radio_unselected
                }
              />
              <span>Tarjeta de crédito</span>
            </label>
          </div>
          {paymentOption === 'creditCard' && (
            <div className={styles.inputs_wrapper}>
              <div className={styles.float_container}>
                <label htmlFor="cardNumber" className={cardNumberStyles.label}>
                  Número de la tarjeta
                </label>
                <input
                  id="cardNumber"
                  onChange={handleCardNumberInputChange}
                  value={cardNumberInput}
                  type="text"
                  inputMode="numeric"
                  placeholder="Número de la tarjeta"
                  className={cardNumberStyles.input}
                  required
                />
              </div>
              <div className={styles.float_container}>
                <label htmlFor="name" className={nameStyles.label}>
                  Nombre en la tarjeta
                </label>
                <input
                  id="name"
                  onChange={(e) => setNameInput(e.target.value)}
                  value={nameInput}
                  type="text"
                  placeholder="Nombre en la tarjeta"
                  className={nameStyles.input}
                  required
                />
              </div>
              <div className={styles.card_security}>
                <div className={styles.float_container}>
                  <label
                    htmlFor="expireDate"
                    className={expireDateStyles.label}
                  >
                    Expiración (MM / AA)
                  </label>
                  <input
                    id="expireDate"
                    onChange={handleExpireDateInput}
                    value={expireDateInput}
                    type="text"
                    placeholder="Expiración (MM / AA)"
                    className={expireDateStyles.input}
                    required
                  />
                </div>
                <div className={styles.float_container}>
                  <label htmlFor="name" className={nameStyles.label}>
                    Nombre en la tarjeta
                  </label>
                  <input
                    id="name"
                    onChange={(e) => setNameInput(e.target.value)}
                    value={nameInput}
                    type="text"
                    placeholder="Nombre en la tarjeta"
                    className={nameStyles.input}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Payment;
