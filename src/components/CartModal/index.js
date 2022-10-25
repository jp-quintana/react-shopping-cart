import ReactDOM from 'react-dom';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

const CartModal = ({ isOpen }) => {
  const portalElement = document.getElementById('overlays');

  return (
    <div className={styles.overlay}>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <aside className={styles.modal}></aside>,
        portalElement
      )}
    </div>
  );
};

export default CartModal;
