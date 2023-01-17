import Card from 'common/Card';
import Button from 'common/Button';

import styles from './index.module.scss';

const CollectionCard = ({ id, image, title, text, url }) => {
  const wrapperStyles =
    +id % 2 === 0
      ? `${styles.content_wrapper} ${styles.content_wrapper_alt}`
      : styles.content_wrapper;

  return (
    <Card className={styles.card}>
      <div className={wrapperStyles}>
        <p className={styles.content_title}>{title}</p>
        <p className={styles.content_subtitle}>{text}</p>
        <Button className={styles.button} to={url}>
          Ver {title}
        </Button>
      </div>
      <img className={styles.image} src={image} alt="" />
    </Card>
  );
};

export default CollectionCard;
