import { Link } from 'react-router-dom';

import Card from 'common/Card';

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
}) => {
  const imageTop = require(`assets/${_imageTop}`);
  const imageBottom = require(`assets/${_imageBottom}`);

  return (
    <Card className={styles.card}>
      <Link to={`/productos/${url}`} className={styles.link}>
        <div className={styles.image_wrapper}>
          <img src={imageTop} alt="" className={styles.image_top}></img>
          <img src={imageBottom} alt="" className={styles.image_bottom}></img>
        </div>
        <ul className={styles.info_wrapper}>
          <li className={styles.title}>
            {type} <span>{model}</span> {color}
          </li>
          <li className={styles.price}>${formatNumber(price)}</li>
        </ul>
      </Link>
    </Card>
  );
};

export default ProductCard;
