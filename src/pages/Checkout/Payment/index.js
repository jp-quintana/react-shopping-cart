import { useState } from 'react';

import { BiChevronLeft } from 'react-icons/bi';

import { formatCardNumber } from 'helpers/format';
import { formatExpiryDate } from 'helpers/format';
import { formatCvv } from 'helpers/format';

import styles from './index.module.scss';

const Payment = ({ handlePreviousStep }) => {
  const [paymentOption, setPaymentOption] = useState('creditCard');

  const [userInput, setUserInput] = useState({
    cardNumber: '',
    name: '',
    expiryDate: '',
    securityCode: '',
  });

  const handleCardNumberInput = (e) => {
    setUserInput((prevState) => ({ ...prevState, cardNumber: e.target.value }));
  };

  const handleNameInput = (e) => {
    setUserInput((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const handleExpiryDateInput = (e) => {
    setUserInput((prevState) => ({ ...prevState, expiryDate: e.target.value }));
  };

  const handleSecurityCodeInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      securityCode: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const cardNumberStyles = {
    label:
      userInput.cardNumber.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.cardNumber.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };

  const nameStyles = {
    label:
      userInput.name.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.name.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const expiryDateStyles = {
    label:
      userInput.expiryDate.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.expiryDate.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };

  const securityCodeStyles = {
    label:
      userInput.securityCode.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.securityCode.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };

  return (
    <div>
      <form id="form" onSubmit={handleSubmit} className={styles.form}>
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
                  onChange={handleCardNumberInput}
                  value={formatCardNumber(userInput.cardNumber)}
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
                  onChange={handleNameInput}
                  value={userInput.name}
                  type="text"
                  placeholder="Nombre en la tarjeta"
                  className={nameStyles.input}
                  autoComplete="off"
                  required
                />
              </div>
              <div className={styles.card_security}>
                <div className={styles.float_container}>
                  <label
                    htmlFor="expiryDate"
                    className={expiryDateStyles.label}
                    autoComplete="off"
                  >
                    Expiración (MM/AA)
                  </label>
                  <input
                    id="expiryDate"
                    onChange={handleExpiryDateInput}
                    value={formatExpiryDate(userInput.expiryDate)}
                    type="text"
                    placeholder="Expiración (MM/AA)"
                    className={expiryDateStyles.input}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className={styles.float_container}>
                  <label
                    htmlFor="securityCode"
                    className={securityCodeStyles.label}
                  >
                    Código de Seguridad
                  </label>
                  <input
                    id="securityCode"
                    onChange={handleSecurityCodeInput}
                    value={formatCvv(userInput.securityCode)}
                    type="password"
                    placeholder="Código de Seguridad"
                    className={securityCodeStyles.input}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* TODO: BILLING ADDRESS */}
      </form>
      <div className={styles.form_controls}>
        <p onClick={handlePreviousStep} className={styles.back}>
          <span>
            <BiChevronLeft />
          </span>
          Volver a envío
        </p>
        <button form="form" type="submit" className={styles.button}>
          Pagar ahora
        </button>
      </div>
    </div>
  );
};

export default Payment;
