import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { useKeyDown } from 'hooks/useKeyDown';

import styles from './index.module.scss';

// TODO: use this component
const Modal = ({
  children,
  close,
  backdropKey,
  modalKey,
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
              <motion.div
                key={backdropKey}
                className={`${styles.backdrop} ${backdropClassName}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                exit={{ opacity: 0 }}
              />
              <div
                onClick={close}
                className={`${styles.modal_container} ${containerClassName}`}
              >
                <div className={`${styles.modal_wrapper} ${wrapperClassName}`}>
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    key={modalKey}
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
