import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCartContext } from 'hooks/useCartContext';
import { useInventory } from 'hooks/useInventory';

import CheckoutProgression from 'components/pages/checkout/CheckoutProgression';
import ShippingInfo from 'components/pages/checkout/ShippingInfo';
import ShippingOption from 'components/pages/checkout/ShippingOption';
import Payment from 'components/pages/checkout/Payment';
import OrderSummary from 'components/pages/checkout/OrderSummary';

import Loader from 'components/common/Loader';
import Toast from 'components/common/Toast';
import ToastMessage from 'components/common/ToastMessage';

import logo from 'assets/images/checkout-logo-nav.png';

import styles from './index.module.scss';

const progressionSteps = [
  { id: 'cart', label: 'Cart', url: '/cart' },
  { id: 'info', label: 'Info' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
];

const Checkout = () => {
  const { checkoutIsReady, currentStep } = useCheckoutContext();
  const { items } = useCartContext();
  const {
    checkInventory,
    isLoading: z,
    error: inventoryError,
  } = useInventory();

  const [toastMessage, setToastMessage] = useState(null);

  let formContent;

  if (progressionSteps[currentStep].id === 'info') {
    formContent = <ShippingInfo />;
  }

  if (progressionSteps[currentStep].id === 'shipping') {
    formContent = <ShippingOption />;
  }

  if (progressionSteps[currentStep].id === 'payment') {
    formContent = <Payment />;
  }

  useEffect(() => {
    checkInventory(items);
  }, []);

  useEffect(() => {
    if (inventoryError) {
      setToastMessage({
        error: inventoryError,
        details: inventoryError.details,
      });
    }
  }, [inventoryError]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      <div className={styles.background} />
      <section className={styles.layout}>
        <>
          {!checkoutIsReady && (
            <Loader
              containerClassName={styles.loader_container}
              noPortal={true}
            />
          )}
          {checkoutIsReady && (
            <>
              <div className={`${styles.header} main-container`}>
                <Link to="/">
                  <img className={styles.logo} src={logo} alt="" />
                </Link>
              </div>
              <div className={`${styles.content_wrapper} main-container`}>
                <div className={styles.info_container}>
                  <div className={styles.info_header}>
                    <Link to="/">
                      <img className={styles.logo} src={logo} alt="" />
                    </Link>
                  </div>
                  <CheckoutProgression steps={progressionSteps} />
                  {formContent}
                </div>
                <div className={styles.order_summary_container}>
                  <OrderSummary />
                </div>
              </div>
            </>
          )}
        </>
      </section>
    </>
  );
};

export default Checkout;
