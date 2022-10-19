import { Link } from 'react-router-dom';

import Card from 'common/Card';

import styles from './index.module.scss';

const ProductCard = ({
  model,
  color,
  price,
  type,
  url,
  imageTop,
  imageBottom,
}) => {
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
          <li className={styles.price}>${price}</li>
        </ul>
      </Link>
    </Card>
  );
};

export default ProductCard;
