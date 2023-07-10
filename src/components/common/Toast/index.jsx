import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import Backdrop from '../Backdrop';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './index.module.scss';

const Toast = ({ children, content, stop }) => {
  const overlayElement = document.getElementById('overlay');

  const [bump, setBump] = useState(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      setBump(true);
      const timer = setTimeout(() => {
        setBump(false);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [content]);

  const toastVariants = {
    initial: { y: '50vh', x: '-50%', opacity: 0 },
    visible: { y: 0, x: '-50%', opacity: 1, scale: bump ? 1.1 : 1 },
    exit: { y: '50vh', x: '-50%', opacity: 0 },
  };

  return (
    <AnimatePresence>
      {children && (
        <>
          {createPortal(
            <>
              {stop && <Backdrop backdropClassName={styles.backdrop} />}
              <motion.div
                key="toast"
                className={styles.toast}
                variants={toastVariants}
                initial="initial"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </>,
            overlayElement
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Toast;
