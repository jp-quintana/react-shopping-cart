import { useState, useEffect } from 'react';
import { Pagination } from 'swiper';

import { useCollection } from 'hooks/useCollection';

import { ProductSlider } from 'components/common';

import styles from './index.module.scss';

const ProductSliderSection = () => {
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
        sortBy: { field: 'price', direction: 'desc' },
      });
      setSlides(fetchedVariants);
    })();
  }, []);

  console.log(slides);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h1 className={styles.section_title}>New arrivals</h1>
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
