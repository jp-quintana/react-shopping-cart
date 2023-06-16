import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { BiChevronLeft } from 'react-icons/bi';

import { useCheckout } from 'hooks/useCheckout';
import { useOrder } from 'hooks/useOrder';

import CheckoutSummary from '../CheckoutSummary';

import Button from 'components/common/Button';
import Loader from 'components/common/Loader';

import { formatCardNumber, formatExpiryDate, formatCvv } from 'helpers/format';

import styles from './index.module.scss';

const Payment = ({ handlePreviousStep }) => {
  const navigate = useNavigate();

  const { selectPreviousStep } = useCheckout();
  const { createOrder, isLoading, error } = useOrder();

  const [paymentOption, setPaymentOption] = useState('creditCard');
  const [navigation, setNavigation] = useState(false);

  const [userInput, setUserInput] = useState({
    cardNumber: '',
    name: '',
    expiryDate: '',
    securityCode: '',
  });

  const handleCardNumberInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      cardNumber: e.target.value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrder(userInput);

    setNavigation(true);
  };

  useEffect(() => {
    if (navigation && !error) {
      navigate('/cuenta');
    } else {
      setNavigation(false);
    }
  }, [navigation]);

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
    <div className={styles.container}>
      {isLoading && <Loader noPortal={true} />}
      {!isLoading && (
        <div className={styles.wrapper}>
          <>
            <CheckoutSummary />
            <form id="form" onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.title}>Payment Method</h2>
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
                    <span>Credit card</span>
                  </label>
                </div>
                {paymentOption === 'creditCard' && (
                  <div className={styles.inputs_wrapper}>
                    <div className={styles.float_container}>
                      <label
                        htmlFor="cardNumber"
                        className={cardNumberStyles.label}
                      >
                        Card number
                      </label>
                      <input
                        id="cardNumber"
                        onChange={handleCardNumberInput}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        value={formatCardNumber(userInput.cardNumber)}
                        type="text"
                        inputMode="numeric"
                        placeholder="Card number"
                        className={cardNumberStyles.input}
                        required
                      />
                    </div>
                    <div className={styles.float_container}>
                      <label htmlFor="name" className={nameStyles.label}>
                        Name on card
                      </label>
                      <input
                        id="name"
                        onChange={handleNameInput}
                        value={userInput.name}
                        type="text"
                        placeholder="Name on card"
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
                          Expiration Date (MM/YY)
                        </label>
                        <input
                          id="expiryDate"
                          onChange={handleExpiryDateInput}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          value={formatExpiryDate(userInput.expiryDate)}
                          type="text"
                          placeholder="Expiration Date (MM/YY)"
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
                          Security code
                        </label>
                        <input
                          id="securityCode"
                          onChange={handleSecurityCodeInput}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          value={formatCvv(userInput.securityCode)}
                          type="password"
                          placeholder="Security code"
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
              <p onClick={selectPreviousStep} className={styles.back}>
                <span>
                  <BiChevronLeft />
                </span>
                Back to shipping
              </p>
              <Button form="form" type="submit" className={styles.button}>
                Pay now
              </Button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default Payment;
