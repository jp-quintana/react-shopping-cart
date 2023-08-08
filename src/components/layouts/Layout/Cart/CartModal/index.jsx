import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { useKeyDown } from 'hooks/useKeyDown';

import { Backdrop, ProductSlider } from 'components/common';

import styles from './index.module.scss';

const CartModal = ({
  children,
  close,
  slides,
  backdropClassName,
  containerClassName,
  wrapperClassName,
  modalClassName,
  productSliderModalClassName,
}) => {
  const overlayElement = document.getElementById('overlay');

  useKeyDown(() => {
    close();
  }, ['Escape']);

  const isBigScreen = useMediaQuery({
    query: '(min-width: 900px)',
  });

  const cartModalVariants = isBigScreen
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

  const productSliderVariants = {
    initial: { x: '-50vw', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '-25vw', opacity: 0 },
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
                    key="product-slider-modal"
                    variants={productSliderVariants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className={`${styles.product_slider_modal} ${productSliderModalClassName}`}
                  >
                    <p className={styles.title}>Recommended Products</p>
                    <ProductSlider
                      slides={slides}
                      slidesPerView="auto"
                      spaceBetween={20}
                      pagination={false}
                      sliderClassName={styles.slider}
                      slideClassName={styles.slide}
                      fillClassName={styles.fill}
                      cardExpandableClassName={styles.expandable}
                      onCardPick={close}
                    />
                  </motion.aside>
                  <motion.aside
                    onClick={(e) => e.stopPropagation()}
                    key="cart-modal"
                    variants={cartModalVariants}
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
