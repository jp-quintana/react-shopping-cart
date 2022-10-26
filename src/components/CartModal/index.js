import ReactDOM from 'react-dom';

import CartModalContent from './CartModalContent';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

const CartModal = ({ toggleCartModal }) => {
  const portalElement = document.getElementById('overlays');

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleCartModal={toggleCartModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <aside className={styles.modal}>
          <CartModalContent toggleCartModal={toggleCartModal} />
        </aside>,
        portalElement
      )}
    </>
  );
};

export default CartModal;
