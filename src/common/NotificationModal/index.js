import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { IoIosCheckmarkCircle, IoIosAlert } from 'react-icons/io';

import styles from './index.module.scss';

const NotificationModal = ({ toggleNotificationModal, content }) => {
  const overlaysElement = document.getElementById('overlays');

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleNotificationModal();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  let ModalContent;

  if (content.addToCartSuccess) {
    const thumbnail = require(`assets/${content._thumbnail}`);
    ModalContent = (
      <div className={`${styles.modal} ${styles.addToCart} ${styles.success}`}>
        <div className={styles.content_wrapper}>
          <img className={styles.image} src={thumbnail} alt="" />
          <div>
            <p className={styles.title}>Producto agregado al carrito</p>
            <p className={styles.details}>
              {content.details || 'La operacion se realizó con éxito.'}
            </p>
          </div>
        </div>
        <i className={styles.icon}>
          <IoIosCheckmarkCircle />
        </i>
      </div>
    );
  }

  if (content.error) {
    ModalContent = (
      <div className={`${styles.modal} ${styles.error}`}>
        <div className={styles.content_wrapper}>
          <div>
            <p className={styles.title}>Hubo un error</p>
            <p className={styles.details}>
              {content.details || 'La operacion no pudo ser realizada.'}
            </p>
          </div>
        </div>
        <i className={styles.icon}>
          <IoIosAlert />
        </i>
      </div>
    );
  }
  return <>{createPortal(ModalContent, overlaysElement)}</>;
};

export default NotificationModal;
