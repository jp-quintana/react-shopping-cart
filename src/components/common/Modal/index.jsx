import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './index.module.scss';

const Modal = ({
  children,
  show,
  close,
  backdropClassName,
  modalClassName,
}) => {
  const overlayElement = document.getElementById('overlay');

  return createPortal(
    <AnimatePresence>
      <>
        {show && (
          <motion.div
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0 }}
            className={`${styles.backdrop} ${backdropClassName}`}
          >
            <motion.div className={`${styles.modal} ${modalClassName}`}>
              {children}
            </motion.div>
          </motion.div>
        )}
      </>
    </AnimatePresence>,
    overlayElement
  );
};

export default Modal;
