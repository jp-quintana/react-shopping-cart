import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Autoplay, Pagination } from 'swiper';

import { Button, Slider } from 'components/common';

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
        <div className={styles.content_container}>
          {showContent && (
            <div className={styles.content_wrapper}>
              <p className={styles.content_title}>Drop #01</p>
              <p className={styles.content_title}>De gira</p>
              <p className={styles.content_subtitle}>
                T-shirts, hoodies & more
              </p>
              <Button className={styles.button} to="/collections/products">
                Shop now
              </Button>
            </div>
          )}
          {isBigScreen && (
            <Slider
              slides={bigScreenSlides}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              sliderClassName={styles.slider}
              imageFillClassName={styles.big_image_fill}
              imageClassName={styles.big_image}
            />
          )}
          {!isBigScreen && (
            <Slider
              slides={smallScreenSlides}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              sliderClassName={styles.slider}
              imageFillClassName={styles.small_image_fill}
              imageClassName={styles.small_image}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
