import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import Card from 'common/Card';

import styles from './index.module.scss';

const CartItem = (props) => {
  return (
    <Card className={styles.card}>
      <div className={styles.info_wrapper}>
        <div className={styles.info}>
          <p className={styles.title}>De Gira</p>
          <p className={styles.type}>Remera Blanca</p>
          <p className={styles.size}>Talle XL</p>
          <p className={styles.price}>$3.600</p>
        </div>
        <img
          className={styles.image}
          src={require('assets/images/productos-remera-de-gira-blanca-1.jpg')}
          alt=""
        />
      </div>
      <div className={styles.controls_wrapper}>
        <div className={styles.delete}>
          <FaTrash />
        </div>
        <div className={styles.quantity_wrapper}>
          <div className={styles.minus}>
            <FaMinus />
          </div>
          <div className={styles.quantity}>1</div>
          <div className={styles.plus}>
            <FaPlus />
          </div>
        </div>
        <div className={styles.total}>$3.600</div>
      </div>
    </Card>
  );
};

export default CartItem;
