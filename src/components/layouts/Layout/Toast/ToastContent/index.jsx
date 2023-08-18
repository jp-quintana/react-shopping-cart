import { useEffect } from 'react';
import { IoIosCheckmarkCircle, IoIosAlert } from 'react-icons/io';

import { MediaContainer } from 'components/common';

import { useToast } from 'hooks/useToast';

import styles from './index.module.scss';

const ToastContent = ({ content, addToCart, error, close, className }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  if (addToCart) {
    return (
      <div onClick={close} className={`${styles.addToCart} ${styles.success}`}>
        <div className={styles.content_wrapper}>
          <MediaContainer
            image={content.image}
            alt=""
            containerClassName={styles.image_container}
            fillClassName={styles.image_fill}
            mediaClassName={styles.image}
          />
          <div>
            <p className={styles.title}>Product added to cart.</p>
            <p className={styles.details}>{content.message}</p>
          </div>
        </div>
        <i className={styles.icon}>
          <IoIosCheckmarkCircle />
        </i>
      </div>
    );
  }

  if (error) {
    return (
      <div onClick={close} className={`${styles.error} ${className}`}>
        <div className={styles.content_wrapper}>
          <div>
            <p className={styles.title}>There was an error.</p>
            <p className={styles.error_details}>{content.message}</p>
          </div>
        </div>
        <i className={styles.icon}>
          <IoIosAlert />
        </i>
      </div>
    );
  }
};

export default ToastContent;
