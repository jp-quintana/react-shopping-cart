import { Link } from 'react-router-dom';

import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import MediaContainer from '../MediaContainer';

import { formatPrice } from 'helpers/format';
import { addIndividualItemPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartItem = ({
  productId,
  variantId,
  skuId,
  model,
  type,
  color,
  size,
  price,
  slug,
  quantity,
  image,
  closeCartModal,
  addItem,
  removeItem,
  deleteItem,
  isLoading,
  loadingItemId,
}) => {
  const handleAddItem = () => {
    if (!isLoading) {
      addItem({
        productId,
        variantId,
        skuId,
        size,
        model,
        type,
        color,
        price,
        slug,
        image,
      });
    }
  };

  const handleRemoveItem = () => {
    if (!isLoading) {
      removeItem(productId, skuId);
    }
  };

  const handleDeleteItem = () => {
    if (!isLoading) {
      deleteItem(skuId);
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/products/${slug}`} onClick={closeCartModal}>
        <div className={styles.info_container}>
          <div className={styles.info_wrapper}>
            <p className={styles.title}>{`${model} ${type}`}</p>
            <p className={styles.color}>{color}</p>
            <p className={styles.size}>{size?.toUpperCase()}</p>
            <p className={styles.price}>${formatPrice(price)}</p>
          </div>
          <MediaContainer
            image={image}
            alt=""
            containerClassName={styles.image_container}
            fillClassName={styles.image_fill}
            mediaClassName={styles.image}
          />
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
          <div className={styles.quantity}>
            {loadingItemId === skuId && (
              <span className={styles.quantity_loader}></span>
            )}
            <span
              className={
                loadingItemId === skuId ? styles.quantity_no_show : undefined
              }
            >
              {quantity}
            </span>
          </div>
          <i className={styles.plus_icon} onClick={handleAddItem}>
            <FaPlus />
          </i>
        </div>
        <div className={styles.total}>
          ${addIndividualItemPrice({ price, quantity })}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
