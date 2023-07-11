import { useEffect } from 'react';

import { useCartContext } from 'hooks/useCartContext';
import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import { formatPrice } from 'helpers/format';
import { addAllItemsPriceNumber } from 'helpers/item';

import { MediaContainer } from 'components/common';

import styles from './index.module.scss';

const OrderSummary = () => {
  const { items } = useCartContext();
  const { shippingOption, currentStep } = useCheckoutContext();
  const { selectShippingOption } = useCheckout();

  useEffect(() => {
    if (
      currentStep === 2 &&
      !shippingOption.standard &&
      !shippingOption.expedited
    ) {
      selectShippingOption('standard');
    }
  }, [currentStep]);

  let shipping_price;
  let shipping_price_text;
  let shipping_option;
  let shipping_option_className;

  if (!shippingOption.standard && !shippingOption.expedited) {
    shipping_price = 0;
    shipping_price_text = 'Calculated next step';
    shipping_option_className = styles.no_shipping_option;
  } else {
    if (shippingOption.standard) {
      shipping_price_text = 'Free';
      shipping_price = 0;
      shipping_option = '(standard)';
      shipping_option_className = styles.shipping_option;
    } else {
      shipping_price = 15;
      shipping_option = '(expedited)';
      shipping_option_className = styles.shipping_option;
    }
  }

  const subtotal = addAllItemsPriceNumber(items);
  const total = +subtotal + shipping_price;

  return (
    <>
      <div className={styles.list_wrapper}>
        {items.map((item) => (
          <div key={item.skuId} className={styles.item_container}>
            <div className={styles.image}>
              <MediaContainer
                containerClassName={styles.image_container}
                fillClassName={styles.image_fill}
                image={item.image}
              />
              <div className={styles.quantity}>
                <div>{item.quantity}</div>
              </div>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>
                {item.model} {item.type} - {item.color}
              </p>
              <p className={styles.size}>{item.size?.toUpperCase()}</p>
            </div>
            <p className={styles.price}>$ {formatPrice(item.price)}</p>
          </div>
        ))}
      </div>
      <div className={styles.subtotal_wrapper}>
        <div>
          <p>Subtotal</p>
          <p className={styles.subtotal_price}>$ {formatPrice(subtotal)}</p>
        </div>
        <div>
          <p>
            Shipping <i>{shipping_option}</i>
          </p>
          <p className={shipping_option_className}>
            {shipping_price > 0
              ? `$ ${formatPrice(shipping_price)}`
              : shipping_price_text}
          </p>
        </div>
      </div>
      <div className={styles.total_wrapper}>
        <p>Total</p>
        <p className={styles.total_price}>$ {formatPrice(total)}</p>
      </div>
    </>
  );
};

export default OrderSummary;
