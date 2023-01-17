import { useMediaQuery } from 'react-responsive';

import Button from 'common/Button';
import Slideshow from 'common/Slideshow';

import {
  BIG_SCREEN_SLIDES as bigScreenSlides,
  SMALL_SCREEN_SLIDES as smallScreenSlides,
} from './data';

import styles from './index.module.scss';

const SlideshowSection = () => {
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 900px)',
  });

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_text}>Comprá lo</p>
        <h1 className={styles.section_title}>Ultimo</h1>
        <div className={styles.wrapper}>
          <div className={styles.content_wrapper}>
            <p className={styles.content_title}>Capsula #01</p>
            <p className={styles.content_title}>De gira</p>
            <p className={styles.content_subtitle}>Remeras, buzos y gorras</p>
            <Button className={styles.button} to="/categorias/productos">
              Ver productos
            </Button>
          </div>
          {!isSmallScreen && <Slideshow slides={bigScreenSlides} />}
          {isSmallScreen && (
            <Slideshow slides={smallScreenSlides} className={styles.image} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
