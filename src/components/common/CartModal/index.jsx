import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import { useKeyDown } from 'hooks/useKeyDown';
import { useCollection } from 'hooks/useCollection';

import Backdrop from '../Backdrop';
import ProductSlider from '../ProductSlider';

import styles from './index.module.scss';

const initialSlides = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
];

const CartModal = ({
  children,
  close,
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

  const { getCollection } = useCollection();

  const [fetchedVariants, setFetchedVariants] = useState(null);
  const [slides, setSlides] = useState(initialSlides);

  useEffect(() => {
    if (children && !fetchedVariants) {
      setTimeout(() => {
        (async () => {
          const fetchedVariants = await getCollection({
            sortBy: { field: 'price', direction: 'desc' },
          });

          const sortedVariants = fetchedVariants.sort((a, b) =>
            a.color.toUpperCase() > b.color.toUpperCase() ? 1 : -1
          );
          setFetchedVariants(sortedVariants);
          setSlides(sortedVariants);
        })();
      }, 200);
    }

    if (children && fetchedVariants) {
      setTimeout(() => {
        setSlides(fetchedVariants);
      }, 200);
    }

    if (!children) {
      setTimeout(() => {
        setSlides(initialSlides);
      }, 200);
    }

    if (!isBigScreen) {
      setSlides(initialSlides);
    }
  }, [children, isBigScreen]);

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
    exit: { x: '-50vw', opacity: 0 },
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
                  {isBigScreen && (
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
                  )}
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
