import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import Button from 'components/common/Button';
import Image from 'components/common/Image';

import { formatNumber } from 'helpers/format';

import styles from './index.module.scss';

const ProductCard = ({
  productId,
  variantId,
  model,
  color,
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

  const [showDetailsPlaceholder, setDetailsShowPlaceholder] = useState(true);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <Link to={`/products/${slug}`} className={styles.link}>
            <Image
              src={imageTop.src}
              alt=""
              clearPlaceholders={() => setDetailsShowPlaceholder(false)}
              containerClassName={styles.image_container}
            />
          </Link>
        </div>
        <ul className={styles.info_wrapper}>
          {showDetailsPlaceholder && (
            <>
              <li className={styles.title_placeholder} />
              <li className={styles.color_placeholder} />
              <li className={styles.price_placeholder} />
            </>
          )}
          {!showDetailsPlaceholder && (
            <>
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
            </>
          )}
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
