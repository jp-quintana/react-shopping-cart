import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { useKeyDown } from 'hooks/useKeyDown';

import Backdrop from '../Backdrop';

import styles from './index.module.scss';

const CartModal = ({
  children,
  close,
  backdropClassName,
  containerClassName,
  wrapperClassName,
  modalClassName,
}) => {
  useKeyDown(() => {
    close();
  }, ['Escape']);

  const overlayElement = document.getElementById('overlay');

  const isBigScreen = useMediaQuery({
    query: '(min-width: 900px)',
  });

  const variants = isBigScreen
    ? {
        initial: { x: '50vw', opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: '50vw', opacity: 0 },
      }
    : {
        initial: { y: '50vh', opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: '50vh', opacity: 0 },
      };

  return (
    <AnimatePresence>
      {children && (
        <>
          {createPortal(
            <>
              <Backdrop
                backdropClassName={`${styles.backdrop} ${backdropClassName}`}
              />
              <div
                onClick={close}
                className={`${styles.modal_container} ${containerClassName}`}
              >
                <div className={`${styles.modal_wrapper} ${wrapperClassName}`}>
                  <motion.aside
                    onClick={(e) => e.stopPropagation()}
                    key="cart-modal"
                    variants={variants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className={`${styles.cart_modal} ${modalClassName}`}
                  >
                    {children}
                  </motion.aside>
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

export default CartModal;
