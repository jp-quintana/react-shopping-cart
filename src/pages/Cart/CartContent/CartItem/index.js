import { Link } from 'react-router-dom';

import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import Card from 'common/Card';

import { formatNumber } from 'helpers/formatNumber';

import styles from './index.module.scss';

const CartItem = (props) => {
  const {
    name,
    type,
    color,
    size,
    price,
    url,
    amount,
    images,
    item,
    onAddItem,
    onRemoveItem,
    onDeleteItem,
  } = props;

  const handleAddItem = () => {
    onAddItem(item);
  };

  const handleRemoveItem = () => {
    onRemoveItem(item);
  };

  const handleDeleteItem = () => {
    onDeleteItem(item);
  };

  let totalItemAmount = price * amount;

  return (
    <Card className={styles.card}>
      <Link to={`/productos/${props.url}`}>
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
        <div className={styles.total}>${formatNumber(totalItemAmount)}</div>
      </div>
    </Card>
  );
};

export default CartItem;
