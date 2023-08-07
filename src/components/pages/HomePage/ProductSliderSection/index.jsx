import { useState, useEffect } from 'react';
import { Pagination } from 'swiper';

import { useCollection } from 'hooks/useCollection';

import { ProductSlider } from 'components/common';

import styles from './index.module.scss';

const ProductSliderSection = ({ titleTop, titleBottom, sortBy }) => {
  const { getCollection } = useCollection();

  const [slides, setSlides] = useState([
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
  ]);

  useEffect(() => {
    (async () => {
      const fetchedVariants = await getCollection({
        sortBy,
      });

      setSlides(
        fetchedVariants.sort((a, b) =>
          a.color.toUpperCase() > b.color.toUpperCase() ? 1 : -1
        )
      );
    })();
  }, []);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        {titleTop && <p className={styles.section_title_top}>{titleTop}</p>}
        {titleBottom && (
          <h1 className={styles.section_title_bottom}>{titleBottom}</h1>
        )}
        <div className={styles.carousel_container}>
          <ProductSlider
            slides={slides}
            slidesPerView="auto"
            spaceBetween={20}
            pagination={false}
            modules={[Pagination]}
            sliderClassName={styles.slider}
            slideClassName={styles.slide}
            fillClassName={styles.fill}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductSliderSection;
