import { Link } from 'react-router-dom';

import Card from 'common/Card';
import Button from 'common/Button';

import styles from './index.module.scss';

const CollectionCard = (props) => {
  const { image, title, url } = props;

  return (
    <Card className={styles.card}>
      <Link to={url} className={`${styles.link}`}>
        <Button className={styles.button}>{title}</Button>
      </Link>
      <img className={styles.image} src={image} alt="" />
    </Card>
  );
};

export default CollectionCard;
