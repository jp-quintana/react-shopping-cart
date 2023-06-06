import { Link, useLocation } from 'react-router-dom';

import Card from 'components/common/Card';
import Button from 'components/common/Button';

import { formatNumber } from 'helpers/format';

import styles from './index.module.scss';

const ProductCard = ({
  productId,
  variantId,
  model,
  color,
  colorDisplay,
  currentPrice,
  actualPrice,
  type,
  slug,
  imageTop,
  imageBottom,
  numberOfVariants,
  handleDeleteStart,
}) => {
  const location = useLocation();

  const isAdmin = location.pathname.split('/')[1] === 'admin';

  return (
    <>
      <div className={styles.card_wrapper}>
        <Card className={styles.card}>
          <Link to={`/products/${slug}`} className={styles.link}>
            <div className={styles.image_wrapper}>
              <img src={imageTop.src} alt="" className={styles.image_top}></img>
              <img
                src={imageBottom.src}
                alt=""
                className={styles.image_bottom}
              ></img>
            </div>
          </Link>
        </Card>
        <ul className={styles.info_wrapper}>
          <li className={styles.title}>
            {type} {model}
          </li>
          <li className={styles.color}>
            {color}
            {numberOfVariants > 1 && (
              <span>{`${numberOfVariants} colores`}</span>
            )}
          </li>
          <li className={styles.price}>${formatNumber(currentPrice)}</li>
        </ul>
        {isAdmin && (
          <div className={styles.admin_buttons_wrapper}>
            <Button className={styles.edit} to={`/admin/products/${productId}`}>
              Edit
            </Button>
            <Button
              onClick={() =>
                handleDeleteStart({
                  productId,
                  variantId,
                })
              }
              className={styles.delete}
              type="button"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
