import CenterModal from 'common/CenterModal';
import Button from 'common/Button';

import { addAllItemsPrice, addAllItemsAmount } from 'helpers/item';
import { formatNumber, formatDate } from 'helpers/format';

import styles from './index.module.scss';

const OrderModal = ({ toggleOrderModal, id, items, date }) => {
  return (
    <CenterModal toggleModal={toggleOrderModal}>
      <div className={styles.content_container}>
        <div className={styles.modal_header}>
          <h3>Orden #{id}</h3>
          <p className={styles.date}>{formatDate(date)}</p>
        </div>
        <div className={styles.list_wrapper}>
          {items.map((item) => (
            <div key={item.id} className={styles.item_container}>
              <div className={styles.image_wrapper}>
                <img
                  className={styles.image}
                  src={require(`assets/${item.thumbnail}`)}
                  alt=""
                />
                <div className={styles.amount}>
                  <div>{item.amount}</div>
                </div>
              </div>
              <div className={styles.info}>
                <p className={styles.name}>
                  {item.type} {item.name} {item.color}
                </p>
                <p className={styles.size}>{item.size}</p>
              </div>
              <p className={styles.price}>${formatNumber(item.price)}</p>
            </div>
          ))}
        </div>
        <div className={styles.modal_footer}>
          <p>
            <span>Total: {addAllItemsPrice(items)} </span> |{' '}
            {addAllItemsAmount(items)} Items
          </p>
          <Button className={styles.button} onClick={toggleOrderModal}>
            Volver a mi cuenta
          </Button>
        </div>
      </div>
    </CenterModal>
  );
};

export default OrderModal;
