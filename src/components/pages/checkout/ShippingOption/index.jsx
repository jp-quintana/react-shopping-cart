import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import CheckoutSummary from '../CheckoutSummary';

import Button from 'components/common/Button';
import Loader from 'components/common/Loader';

import { BiChevronLeft } from 'react-icons/bi';

import styles from './index.module.scss';

const ShippingOption = () => {
  const { shippingOption } = useCheckoutContext();
  const {
    selectPreviousStep,
    selectShippingOption,
    submitShippingOption,
    isLoading,
  } = useCheckout();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitShippingOption(shippingOption);
  };

  return (
    <div className={styles.shipping_option_container}>
      {isLoading && <Loader noPortal={true} />}
      {!isLoading && (
        <div className={styles.shipping_option_wrapper}>
          <>
            <CheckoutSummary />
            <h2>Shipping Method</h2>
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
                    checked={shippingOption.standard}
                    onChange={(e) => selectShippingOption(e.target.value)}
                    className={
                      shippingOption.standard
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <span>Standard Shipping (3 - 5 Bus. Days)</span>
                </label>
                <p>$750</p>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="expidited"
                    checked={shippingOption.expidited}
                    onChange={(e) => selectShippingOption(e.target.value)}
                    className={
                      shippingOption.expidited
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <span>Expidited (2 - 3 Bus. Days)</span>
                </label>
                <p>$1500</p>
              </div>
            </form>
            <div className={styles.form_controls}>
              <p onClick={selectPreviousStep} className={styles.back}>
                <span>
                  <BiChevronLeft />
                </span>
                Back to information
              </p>
              <Button form="form" type="submit" className={styles.button}>
                Continue to payment
              </Button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default ShippingOption;
