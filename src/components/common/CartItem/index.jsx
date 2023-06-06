import { Link, useParams } from 'react-router-dom';

import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import Card from 'components/common/Card';

import { formatNumber } from 'helpers/format';
import { addItemPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartItem = ({
  model,
  type,
  color,
  size,
  price,
  slug,
  amount,
  thumbnail,
  item,
  toggleCartModal,
  addItem,
  removeItem,
  deleteItem,
  isLoading,
}) => {
  const { id: urlId } = useParams();

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

  const clearProduct = urlId === slug && '/productos';

  return (
    <Card className={styles.card}>
      <Link
        to={`/products/${slug}`}
        state={clearProduct}
        onClick={toggleCartModal ? toggleCartModal : ''}
      >
        <div className={styles.info_container}>
          <div className={styles.info_wrapper}>
            <p className={styles.title}>{`${type} ${model}`}</p>
            <p className={styles.color}>{color}</p>
            <p className={styles.size}>{size.toUpperCase()}</p>
            <p className={styles.price}>${formatNumber(price)}</p>
          </div>
          <img className={styles.image} src={thumbnail} alt="" />
        </div>
      </Link>

      <div className={styles.controls_wrapper}>
        <div className={styles.delete_wrapper}>
          <i className={styles.delete_icon} onClick={handleDeleteItem}>
            <FaTrash />
          </i>
        </div>
        <div className={styles.quantity_wrapper}>
          <i className={styles.minus_icon} onClick={handleRemoveItem}>
            <FaMinus />
          </i>
          <div className={styles.quantity}>{amount}</div>
          <i className={styles.plus_icon} onClick={handleAddItem}>
            <FaPlus />
          </i>
        </div>
        <div className={styles.total}>${addItemPrice({ price, amount })}</div>
      </div>
    </Card>
  );
};

export default CartItem;
