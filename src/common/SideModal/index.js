import { createPortal } from 'react-dom';

import { useKeyDown } from 'hooks/useKeyDown';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

const SideModal = ({ children, toggleModal, className }) => {
  const backdropElement = document.getElementById('backdrop');
  const overlaysElement = document.getElementById('overlays');

  useKeyDown(() => {
    toggleModal();
  }, ['Escape']);

  console.log(className);

  return (
    <>
      {createPortal(<Backdrop toggleModal={toggleModal} />, backdropElement)}
      {createPortal(
        <aside className={`${styles.modal} ${className}`}>{children}</aside>,
        overlaysElement
      )}
    </>
  );
};

export default SideModal;
