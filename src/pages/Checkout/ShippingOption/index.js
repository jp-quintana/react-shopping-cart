import { useState } from 'react';

import { useCheckout } from 'hooks/useCheckout';

import { BiChevronLeft } from 'react-icons/bi';

import styles from './index.module.scss';

const ShippingOption = () => {
  const { selectPreviousStep, submitShippingOption } = useCheckout();
  const [shippingOption, setShippgingOption] = useState('standard');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitShippingOption();
  };

  return (
    <div className={styles.shipping_option_wrapper}>
      <h2>Tipo de Envio</h2>
      <form
        id="form"
        onSubmit={handleSubmit}
        className={styles.shipping_option_form}
      >
        <div>
          <label>
            <input
              type="radio"
              value="standard"
              checked={shippingOption === 'standard'}
              onChange={(e) => setShippgingOption(e.target.value)}
              className={
                shippingOption === 'standard'
                  ? styles.radio_selected
                  : styles.radio_unselected
              }
            />
            <span>Envio estandard (3 - 5 días)</span>
          </label>
          <p>$750</p>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="expidited"
              checked={shippingOption === 'expidited'}
              onChange={(e) => setShippgingOption(e.target.value)}
              className={
                shippingOption === 'expidited'
                  ? styles.radio_selected
                  : styles.radio_unselected
              }
            />
            <span>Envio rápido (2 - 3 días)</span>
          </label>
          <p>$1500</p>
        </div>
      </form>
      <div className={styles.form_controls}>
        <p onClick={selectPreviousStep} className={styles.back}>
          <span>
            <BiChevronLeft />
          </span>
          Volver a info
        </p>
        <button form="form" type="submit" className={styles.button}>
          Continuar a pago
        </button>
      </div>
    </div>
  );
};

export default ShippingOption;
