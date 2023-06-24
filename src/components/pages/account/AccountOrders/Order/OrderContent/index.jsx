import Button from 'components/common/Button';

import { useKeyDown } from 'hooks/useKeyDown';

import { addAllItemsPrice, addAllItemsQuantity } from 'helpers/item';
import { formatPrice, formatDate } from 'helpers/format';

import styles from './index.module.scss';

const OrderContent = ({ toggleOrderModal, id, items, date }) => {
  useKeyDown(() => {
    toggleOrderModal();
  }, ['Escape']);

  return (
    <div className={styles.content_container}>
      <div className={styles.modal_header}>
        <h3>Order #{id}</h3>
        <p className={styles.date}>{formatDate(date)}</p>
      </div>
      <div className={styles.list_wrapper}>
        {items.map((item) => (
          <div key={item.id} className={styles.item_container}>
            <div className={styles.image_wrapper}>
              <img className={styles.image} src={item.thumbnail} alt="" />
              <div className={styles.amount}>
                <div>{item.amount}</div>
              </div>
            </div>
            <div className={styles.info_wrapper}>
              <p className={styles.name}>
                {`${item.type} ${item.model} - ${item.color}`}
              </p>
              <p className={styles.size}>{item.size.toUpperCase()}</p>
            </div>
            <p className={styles.price}>${formatPrice(item.price)}</p>
          </div>
        ))}
      </div>
      <div className={styles.modal_footer}>
        <p>
          <span>Total: {addAllItemsPrice(items)} </span> |{' '}
          {addAllItemsQuantity(items)}{' '}
          {addAllItemsQuantity(items) > 1 ? 'Items' : 'Item'}
        </p>
        <Button className={styles.button} onClick={toggleOrderModal}>
          Back to account
        </Button>
      </div>
    </div>
  );
};

export default OrderContent;
