import { Link, useParams } from 'react-router-dom';

import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import Card from 'common/Card';

import { formatNumber } from 'helpers/format';
import { addItemPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartItem = ({
  model,
  type,
  color,
  size,
  price,
  url,
  amount,
  _thumbnail,
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

  const thumbnail = require(`assets/${_thumbnail}`);

  const clearProduct = urlId === url && '/productos';

  return (
    <Card className={styles.card}>
      <Link
        to={`/productos/${url}`}
        state={clearProduct}
        onClick={toggleCartModal ? toggleCartModal : ''}
      >
        <div className={styles.info_wrapper}>
          <div className={styles.info}>
            <p className={styles.title}>{model}</p>
            <p className={styles.type}>{`${type} ${color}`}</p>
            <p className={styles.size}>Talle {size}</p>
            <p className={styles.price}>${formatNumber(price)}</p>
          </div>
          <img className={styles.image} src={thumbnail} alt="" />
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
