import { createPortal } from 'react-dom';

import CartModalContent from './CartModalContent';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

const CartModal = ({ toggleCartModal }) => {
  const backdropElement = document.getElementById('backdrop');
  const overlaysElement = document.getElementById('overlays');

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
