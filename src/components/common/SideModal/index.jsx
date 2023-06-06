import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import Backdrop from 'components/common/Backdrop';

import styles from './index.module.scss';

const SideModal = ({
  children,
  toggleModal,
  backdropClassName,
  modalClassName,
}) => {
  const backdropElement = document.getElementById('backdrop');
  const overlaysElement = document.getElementById('overlays');

  const isBigScreen = useMediaQuery({
    query: '(min-width: 900px)',
  });

  const variants = isBigScreen
    ? {
        initial: { x: '100vw', y: '-50%', opacity: 0 },
        visible: { x: 0, y: '-50%', opacity: 1 },
        exit: { x: '100vw', y: '-50%', opacity: 0 },
      }
    : {
        initial: { x: '50%', y: '100vh', opacity: 0 },
        visible: { x: '50%', y: 0, opacity: 1 },
        exit: { x: '50%', y: '100vh', opacity: 0 },
      };

  return (
    <AnimatePresence>
      {children && (
        <>
          {createPortal(
            <Backdrop
              toggleModal={toggleModal}
              className={backdropClassName}
            />,
            backdropElement
          )}
          {createPortal(
            <motion.aside
              className={`${styles.modal} ${modalClassName}`}
              key="sidemodal"
              variants={variants}
              initial="initial"
              animate="visible"
              transition={{ duration: 0.2 }}
              exit="exit"
            >
              {children}
            </motion.aside>,
            overlaysElement
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default SideModal;
