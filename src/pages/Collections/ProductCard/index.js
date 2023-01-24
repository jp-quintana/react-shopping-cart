import { Link } from 'react-router-dom';

import Card from 'components/Card';

import { formatNumber } from 'helpers/format';

import styles from './index.module.scss';

const ProductCard = ({
  model,
  color,
  price,
  type,
  url,
  _imageTop,
  _imageBottom,
  numberOfVariants,
}) => {
  const imageTop = require(`assets/${_imageTop}`);
  const imageBottom = require(`assets/${_imageBottom}`);

  return (
    <>
      <div className={styles.card_wrapper}>
        <Card className={styles.card}>
          <Link to={`/productos/${url}`} className={styles.link}>
            <div className={styles.image_wrapper}>
              <img src={imageTop} alt="" className={styles.image_top}></img>
              <img
                src={imageBottom}
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
          <li className={styles.price}>${formatNumber(price)}</li>
        </ul>
      </div>
    </>
  );
};

export default ProductCard;
