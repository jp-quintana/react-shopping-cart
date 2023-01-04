import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { IoIosCheckmarkCircle } from 'react-icons/io';

import styles from './index.module.scss';

const NotificationModal = ({ addToCartSuccess, thumbnail }) => {
  const overlaysElement = document.getElementById('overlays');

  addToCartSuccess = true;

  useEffect(() => {}, []);

  let ModalContent;

  if (addToCartSuccess) {
    ModalContent = (
      <div className={`${styles.modal} ${styles.addToCart} ${styles.success}`}>
        <img className={styles.image} src={thumbnail} alt="" />
        <div>
          <p className={styles.title}>Producto agregado al carrito</p>
          <p className={styles.details}></p>
        </div>
        <i>
          <IoIosCheckmarkCircle />
        </i>
      </div>
    );
  }
  return <>{createPortal(ModalContent, overlaysElement)}</>;
};

export default NotificationModal;
