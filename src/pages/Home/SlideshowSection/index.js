import Button from 'common/Button';
import Slideshow from 'common/Slideshow';

import { SLIDES as slides } from './data';

import styles from './index.module.scss';

const SlideshowSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_text}>Comprá lo</p>
        <h1 className={styles.section_title}>Ultimo</h1>
        <div className={styles.wrapper}>
          <div className={styles.content_wrapper}>
            <p className={styles.content_title}>Capsula #01</p>
            <p className={styles.content_title}>FLAAKKO</p>
            <p className={styles.content_subtitle}>Remeras, buzos y gorras</p>
            <Button className={styles.link} to="/categorias/productos">
              Ver productos
            </Button>
          </div>

          <Slideshow slides={slides} />
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
