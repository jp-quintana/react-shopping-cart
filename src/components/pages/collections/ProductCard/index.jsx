import { useState } from 'react';

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

  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [showImagePlaceholder, setImageShowPlaceholder] = useState(true);

  const clearImagePlaceholder = () => {
    setImageShowPlaceholder(false);
    setTimeout(() => {
      return setImageIsLoading(false);
    }, 100);
  };

  return (
    <>
      <div className={styles.container}>
        <Card className={styles.card}>
          <Link to={`/products/${slug}`} className={styles.link}>
            <div className={styles.image_container}>
              {imageIsLoading && (
                <div
                  className={`${styles.image_placeholder} ${
                    showImagePlaceholder ? undefined : styles.hide
                  }`}
                />
              )}
              <img
                src={imageTop.src}
                onLoad={clearImagePlaceholder}
                alt=""
                className={`${styles.image_primary} ${
                  !imageIsLoading ? styles.show : undefined
                }`}
              ></img>
            </div>
          </Link>
        </Card>
        <ul className={styles.info_wrapper}>
          {showImagePlaceholder && (
            <>
              <li className={styles.title_placeholder} />
              <li className={styles.color_placeholder} />
              <li className={styles.price_placeholder} />
            </>
          )}
          {!showImagePlaceholder && (
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
