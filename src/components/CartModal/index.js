import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import CartModalContent from './CartModalContent';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

const CartModal = ({ toggleCartModal }) => {
  const backdropElement = document.getElementById('backdrop');
  const overlaysElement = document.getElementById('overlays');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();

        toggleCartModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {createPortal(
        <Backdrop toggleModal={toggleCartModal} />,
        backdropElement
      )}
      {createPortal(
        <aside className={styles.modal}>
          <CartModalContent toggleCartModal={toggleCartModal} />
        </aside>,
        overlaysElement
      )}
    </>
  );
};

export default CartModal;
