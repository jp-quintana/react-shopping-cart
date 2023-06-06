import Video from 'assets/videos/hero.mp4';
import LogoHero from 'assets/images/logo-hero.png';

import styles from './index.module.scss';

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.video_background}>
          <video autoPlay loop muted className={styles.video}>
            <source src={Video} type="video/mp4" />
          </video>
        </div>
        <div className={styles.content}>
          <div className={styles.logo_wrapper}>
            <img src={LogoHero} alt="Hero Logo" className={styles.logo} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
