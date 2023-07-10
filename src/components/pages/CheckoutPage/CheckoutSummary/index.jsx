import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import styles from './index.module.scss';

const CheckoutSummary = () => {
  const { currentStep, email, shippingAddress, shippingOption } =
    useCheckoutContext();
  const { selectStep } = useCheckout();

  let shipping_option;

  if (shippingOption.standard) {
    shipping_option = 'Standard - Free';
  } else {
    shipping_option = 'Expedited - $15.00';
  }

  if (currentStep === 2)
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contact</p>
          <p className={styles.content}>{email}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Update
          </p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Address</p>
          <p className={styles.content}>
            {shippingAddress.address} - {shippingAddress.city},{' '}
            {shippingAddress.state} {shippingAddress.zipCode}
          </p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Update
          </p>
        </li>
      </ul>
    );

  if (currentStep === 3)
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contact</p>
          <p className={styles.content}>{email}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 2)}
          >
            Update
          </p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Address</p>
          <p className={styles.content}>
            {shippingAddress.address} - {shippingAddress.city},{' '}
            {shippingAddress.state} {shippingAddress.zipCode}
          </p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 2)}
          >
            Update
          </p>
        </li>
        <li className={styles.method}>
          <p className={styles.label}>Shipping</p>
          <p className={styles.content}>{shipping_option}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Update
          </p>
        </li>
      </ul>
    );
};

export default CheckoutSummary;
