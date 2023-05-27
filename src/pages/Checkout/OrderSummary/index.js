import { useCartContext } from 'hooks/useCartContext';
import { useCheckoutContext } from 'hooks/useCheckoutContext';

import { formatNumber } from 'helpers/format';
import { addAllItemsPriceNumber } from 'helpers/item';

import styles from './index.module.scss';

const OrderSummary = () => {
  const { items } = useCartContext();
  const { shippingOption } = useCheckoutContext();

  let shipping_price;
  let shipping_option;

  if (shippingOption.standard) {
    shipping_price = 750;
    shipping_option = '(estandard)';
  } else {
    shipping_price = 1500;
    shipping_option = '(rápido)';
  }
  const subtotal = addAllItemsPriceNumber(items);
  const total = +subtotal + shipping_price;

  return (
    <>
      <div className={styles.list_wrapper}>
        {items.map((item) => (
          <div key={item.id} className={styles.item_container}>
            <div className={styles.image_wrapper}>
              <img className={styles.image} src={item.thumbnail} alt="" />
              <div className={styles.amount}>
                <div>{item.amount}</div>
              </div>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>
                {item.type} {item.model} - {item.color}
              </p>
              <p className={styles.size}>{item.size.toUpperCase()}</p>
            </div>
            <p className={styles.price}>$ {formatNumber(item.price)}</p>
          </div>
        ))}
      </div>
      <div className={styles.subtotal_wrapper}>
        <div>
          <p>Subtotal</p>
          <p className={styles.subtotal_price}>$ {formatNumber(subtotal)}</p>
        </div>
        <div>
          <p>
            Envío <i>{shipping_option}</i>
          </p>
          <p className={styles.subtotal_price}>
            $ {formatNumber(shipping_price)}
          </p>
        </div>
      </div>
      <div className={styles.total_wrapper}>
        <p>Total</p>
        <p className={styles.total_price}>$ {formatNumber(total)}</p>
      </div>
    </>
  );
};

export default OrderSummary;
