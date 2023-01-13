import { Link } from 'react-router-dom';

import Button from 'common/Button';
import Slideshow from 'common/Slideshow';

import { SLIDES as slides } from './data';

import styles from './index.module.scss';

const SlideshowSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h1 className={styles.title}>Lo último</h1>
        <div className={styles.wrapper}>
          <Link className={styles.link} to="/categorias/productos">
            <Button className={styles.button}>Cápsula #01</Button>
          </Link>

          <Slideshow slides={slides} />
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
