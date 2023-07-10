import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';
import { useInventory } from 'hooks/useInventory';

import CheckoutProgression from './CheckoutProgression';
import ShippingInfo from './ShippingInfo';
import ShippingOption from './ShippingOption';
import Payment from './Payment';
import OrderSummary from './OrderSummary';

import { Loader, Toast, ToastMessage } from 'components/common';

import logo from 'assets/images/checkout-logo-nav.png';

import styles from './index.module.scss';

const progressionSteps = [
  { id: 'cart', label: 'Cart', url: '/cart' },
  { id: 'info', label: 'Info' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { items, cartNeedsCheck } = useCartContext();
  const { checkoutIsReady, currentStep } = useCheckoutContext();
  const { activateCartCheck } = useCart();
  const { checkInventory, isLoading, error: inventoryError } = useInventory();

  const [stopCheckout, setStopCheckout] = useState(false);
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
    if (cartNeedsCheck) {
      checkInventory(items);
    } else {
      activateCartCheck();
    }
  }, []);

  useEffect(() => {
    if (inventoryError) {
      if (items.length === 0) {
        setStopCheckout(true);

        setToastMessage({
          error: inventoryError,
          message: `${inventoryError.message} Redirecting...`,
        });

        setTimeout(() => {
          navigate('/');
        }, 4000);
      } else {
        setToastMessage({
          error: inventoryError,
          message: inventoryError.message,
        });
      }
    }
  }, [inventoryError]);

  return (
    <>
      <Toast content={toastMessage} stop={setStopCheckout}>
        {toastMessage && (
          <ToastMessage
            close={() => setToastMessage(null)}
            content={toastMessage}
          />
        )}
      </Toast>
      <div className={styles.background} />
      <section className={styles.layout}>
        <>
          {!checkoutIsReady && isLoading && (
            <Loader
              containerClassName={styles.loader_container}
              noPortal={true}
            />
          )}
          {checkoutIsReady && !isLoading && (
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

export default CheckoutPage;
