import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { useKeyDown } from 'hooks/useKeyDown';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

const NavDrawer = ({
  children,
  close,
  backdropClassName,
  containerClassName,
  wrapperClassName,
}) => {
  useKeyDown(() => {
    toggleSideNav();
  }, ['Escape']);

  const overlayElement = document.getElementById('overlay');

  const variants = {
    initial: { x: '50vw', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '50vw', opacity: 0 },
  };

  return (
    <AnimatePresence>
      {children && (
        <>
          {createPortal(
            <>
              <Backdrop
                close={close}
                className={`${styles.backdrop} ${backdropClassName}`}
              />
              <div
                onClick={close}
                className={`${styles.modal_container} ${containerClassName}`}
              >
                <div className={`${styles.modal_wrapper} ${wrapperClassName}`}>
                  <motion.div
                    key="nav-drawer"
                    variants={variants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className={styles.nav_drawer}
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

export default NavDrawer;
