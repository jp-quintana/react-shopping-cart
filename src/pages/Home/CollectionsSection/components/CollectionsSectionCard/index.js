import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const CollectionsSectionCard = (props) => {
  const { imageTop, imageBottom, title, url } = props;

  return (
    <Link to={url} className={`${styles.link}`}>
      <h3 className={styles.title}>{title}</h3>
      <img className={styles.image_top} src={imageTop} alt="" />
      <img className={styles.image_bottom} src={imageBottom} alt="" />
    </Link>
  );
};

export default CollectionsSectionCard;
