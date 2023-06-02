import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './index.module.scss';

const Toast = ({ children }) => {
  const overlaysElement = document.getElementById('overlays');

  return (
    <AnimatePresence>
      {children && (
        <>
          {createPortal(
            <motion.div
              key="toast"
              className={styles.toast}
              initial={{ x: '50%', y: '100vh' }}
              animate={{ x: '50%', y: '0' }}
              transition={{ duration: 0.2 }}
              exit={{ x: '50%', y: '100vh' }}
            >
              {children}
            </motion.div>,
            overlaysElement
          )}
        </>
      )}
    </AnimatePresence>
  );
};
export default Toast;
