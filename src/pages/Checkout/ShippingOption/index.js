import { useState } from 'react';

import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import { BiChevronLeft } from 'react-icons/bi';

import styles from './index.module.scss';
import { useEffect } from 'react';

const ShippingOption = () => {
  const { shippingOption } = useCheckoutContext();
  const { selectPreviousStep, selectShippingOption, submitShippingOption } =
    useCheckout();

  const [option, setOption] = useState({
    standard: true,
    express: false,
  });

  useEffect(() => {
    if (shippingOption.length > 0) {
      setOption(shippingOption);
    }
  }, [shippingOption]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitShippingOption(option);
  };

  console.log('shippingOption', shippingOption);
  console.log('option', option);

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
              checked={option.standard}
              onChange={(e) => selectShippingOption(e.target.value)}
              className={
                option.standard
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
              value="express"
              checked={option.express}
              onChange={(e) => selectShippingOption(e.target.value)}
              className={
                option.express ? styles.radio_selected : styles.radio_unselected
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
