import { createPortal } from 'react-dom';

import { useKeyDown } from 'hooks/useKeyDown';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

const CenterModal = ({ children, toggleModal, className }) => {
  const backdropElement = document.getElementById('backdrop');
  const overlaysElement = document.getElementById('overlays');

  useKeyDown(() => {
    toggleModal();
  }, ['Escape']);

  return (
    <>
      {createPortal(<Backdrop toggleModal={toggleModal} />, backdropElement)}
      {createPortal(
        <div className={`${styles.modal} ${className}`}>{children}</div>,
        overlaysElement
      )}
    </>
  );
};

export default CenterModal;
