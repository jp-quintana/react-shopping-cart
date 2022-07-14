import Slideshow from 'common/Slideshow';

import { DUMMY_SLIDES } from './data';

import styles from './index.module.scss';

const SlideshowSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Cápsula #01</h1>
          <Slideshow slides={DUMMY_SLIDES} />
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
