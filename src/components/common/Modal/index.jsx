import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { useKeyDown } from 'hooks/useKeyDown';

import Backdrop from '../Backdrop';

import styles from './index.module.scss';

// TODO: use this component
const Modal = ({
  children,
  close,
  key,
  variants,
  transition,
  backdropClassName,
  containerClassName,
  wrapperClassName,
  modalClassName,
}) => {
  useKeyDown(() => {
    close();
  }, ['Escape']);

  const overlayElement = document.getElementById('overlay');

  return (
    <AnimatePresence>
      {children && (
        <>
          {createPortal(
            <>
              <Backdrop backdropClassName={backdropClassName} />
              <div
                onClick={close}
                className={`${styles.modal_container} ${containerClassName}`}
              >
                <div className={`${styles.modal_wrapper} ${wrapperClassName}`}>
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    key={key}
                    variants={variants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={transition}
                    className={`${styles.modal} ${modalClassName}`}
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </>,
            overlayElement
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
