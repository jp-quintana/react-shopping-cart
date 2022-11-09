import { Link } from 'react-router-dom';
import { useCart } from 'hooks/useCart';

import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import Card from 'common/Card';

import { formatNumber } from 'helpers/format';
import { addItemPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartItem = ({
  name,
  type,
  color,
  size,
  price,
  url,
  amount,
  images,
  item,
  toggleCartModal,
}) => {
  const { addItem, removeItem, deleteItem, isLoading, error } = useCart();

  const handleAddItem = () => {
    if (!isLoading) {
      addItem(item);
    }
  };

  const handleRemoveItem = () => {
    if (!isLoading) {
      removeItem(item);
    }
  };

  const handleDeleteItem = () => {
    if (!isLoading) {
      deleteItem(item);
    }
  };

  return (
    <Card className={styles.card}>
      <Link
        to={`/productos/${url}`}
        onClick={toggleCartModal ? toggleCartModal : ''}
      >
        <div className={styles.info_wrapper}>
          <div className={styles.info}>
            <p className={styles.title}>{name}</p>
            <p className={styles.type}>{`${type} ${color}`}</p>
            <p className={styles.size}>Talle {size}</p>
            <p className={styles.price}>${formatNumber(price)}</p>
          </div>
          <img className={styles.image} src={images[0]['src']} alt="" />
        </div>
      </Link>

      <div className={styles.controls_wrapper}>
        <div className={styles.delete}>
          <FaTrash className={styles.delete_icon} onClick={handleDeleteItem} />
        </div>
        <div className={styles.quantity_wrapper}>
          <div className={styles.minus}>
            <FaMinus className={styles.minus_icon} onClick={handleRemoveItem} />
          </div>
          <div className={styles.quantity}>{amount}</div>
          <div className={styles.plus}>
            <FaPlus className={styles.plus_icon} onClick={handleAddItem} />
          </div>
        </div>
        <div className={styles.total}>${addItemPrice({ price, amount })}</div>
      </div>
    </Card>
  );
};

export default CartItem;
