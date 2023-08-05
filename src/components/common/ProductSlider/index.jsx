import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import ProductCard from '../ProductCard';

const ProductSlider = ({
  slides,
  bp,
  slidesPerView,
  spaceBetween,
  pagination,
  allowTouchMove = true,
  modules,
  sliderClassName,
  slideClassName,
  fillClassName,
}) => {
  const [isNestedBeingDragged, setIsNestedBeingDragged] = useState(false);

  return (
    <>
      <Swiper
        breakpoints={bp ? bp : undefined}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={pagination}
        allowTouchMove={allowTouchMove}
        noSwiping={isNestedBeingDragged}
        noSwipingClass="swiper-slide"
        modules={modules}
        className={`${sliderClassName}`}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={slideClassName}>
            {slide.variantId ? (
              <ProductCard
                productId={slide.productId}
                variantId={slide.variantId}
                model={slide.model}
                color={slide.color}
                discount={slide.discount}
                currentPrice={slide.price}
                actualPrice={slide.actualPrice}
                type={slide.type}
                slides={slide.slides}
                images={slide.images}
                numberOfVariants={slide.numberOfVariants}
                skus={slide.skus}
                isSoldOut={slide.isSoldOut}
                allVariants={slide.allVariants}
                nested={true}
                onTouchStart={() => setIsNestedBeingDragged(true)}
                onTouchEnd={() => setIsNestedBeingDragged(false)}
              />
            ) : (
              <div
                className={fillClassName}
                style={{
                  paddingTop: '168.11965812%',
                  background: 'grey',
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSlider;
