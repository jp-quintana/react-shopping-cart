import Button from 'components/common/Button';

import styles from './index.module.scss';

const CollectionCard = ({ id, image, title, text, url }) => {
  const wrapperStyles =
    title === 'hoodies'
      ? `${styles.content_wrapper} ${styles.content_wrapper_alt}`
      : styles.content_wrapper;

  return (
    <div className={styles.card}>
      <div className={wrapperStyles}>
        <p className={styles.content_title}>{title}</p>
        <p className={styles.content_subtitle}>{text}</p>
        <Button className={styles.button} to={url}>
          Shop {title}
        </Button>
      </div>
      <img className={styles.image} src={image} alt="" />
    </div>
  );
};

export default CollectionCard;
