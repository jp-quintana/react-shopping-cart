import { useCartContext } from 'hooks/useCartContext';

import { formatNumber } from 'helpers/format';
import { addAllItemsPriceNumber } from 'helpers/item';

import styles from './index.module.scss';

const OrderSummary = () => {
  const { items } = useCartContext();

  const shipping_price = 700;
  const subtotal = addAllItemsPriceNumber(items);
  const total = +subtotal + shipping_price;

  return (
    <>
      <div className={styles.list_wrapper}>
        {items.map((item) => (
          <div key={item.sku} className={styles.item_container}>
            <div className={styles.image_wrapper}>
              <img
                className={styles.image}
                src={item.images[0]['src']}
                alt=""
              />
              <div className={styles.amount}>
                <div>{item.amount}</div>
              </div>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>
                {item.type} {item.color} {item.name}
              </p>
              <p className={styles.size}>{item.size}</p>
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
          <p>Envío</p>
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
