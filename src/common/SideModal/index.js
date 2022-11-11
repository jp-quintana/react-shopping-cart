import { createPortal } from 'react-dom';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

const SideModal = ({ children, toggleModal }) => {
  const backdropElement = document.getElementById('backdrop');
  const overlaysElement = document.getElementById('overlays');

  return (
    <>
      {createPortal(<Backdrop toggleModal={toggleModal} />, backdropElement)}
      {createPortal(
        <aside className={styles.modal}>{children}</aside>,
        overlaysElement
      )}
    </>
  );
};

export default SideModal;
