import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Button from 'components/Button';
import Slideshow from 'components/Slideshow';

import {
  BIG_SCREEN_SLIDES as bigScreenSlides,
  SMALL_SCREEN_SLIDES as smallScreenSlides,
} from './data';

import styles from './index.module.scss';

const SlideshowSection = () => {
  const [showContent, setShowContent] = useState(true);

  const isBigScreen = useMediaQuery({
    query: '(min-width: 900px)',
  });

  // TODO: AGREGAR EFECTO CUANDO APARECE EL CONTENIDO
  useEffect(() => {
    setShowContent(false);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isBigScreen]);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_text}>Shop the</p>
        <h1 className={styles.section_title}>Latest</h1>
        <div className={styles.wrapper}>
          {showContent && (
            <div className={styles.content_wrapper}>
              <p className={styles.content_title}>Drop #01</p>
              <p className={styles.content_title}>De gira</p>
              <p className={styles.content_subtitle}>
                T-shirts, hoodies & more
              </p>
              <Button className={styles.button} to="/categorias/productos">
                Buy products
              </Button>
            </div>
          )}
          {isBigScreen && <Slideshow slides={bigScreenSlides} />}
          {!isBigScreen && (
            <Slideshow slides={smallScreenSlides} className={styles.image} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
