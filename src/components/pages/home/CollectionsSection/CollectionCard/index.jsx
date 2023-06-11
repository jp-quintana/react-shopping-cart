import Button from 'components/common/Button';
import ImageContainer from 'components/common/ImageContainer';

import styles from './index.module.scss';

const CollectionCard = ({ id, image, title, text, url }) => {
  const contentWrapperStyles =
    title === 'hoodies'
      ? `${styles.content_wrapper} ${styles.content_wrapper_alt}`
      : styles.content_wrapper;

  return (
    <div className={styles.card}>
      <div className={contentWrapperStyles}>
        <p className={styles.content_title}>{title}</p>
        <p className={styles.content_subtitle}>{text}</p>
        <Button className={styles.button} to={url}>
          Shop {title}
        </Button>
      </div>
      {/* <img className={styles.image} src={image} alt="" /> */}
      <ImageContainer
        containerClassName={styles.image_container}
        fillClassName={styles.image_fill}
        imageClassName={styles.image}
        src={image}
        alt=""
      />
    </div>
  );
};

export default CollectionCard;
