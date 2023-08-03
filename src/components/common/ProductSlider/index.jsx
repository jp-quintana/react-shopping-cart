import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import 'swiper/css';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import ProductCard from '../ProductCard';

import './sliderStyles.css';

const ProductSlider = ({
  slides,
  clearPlaceholders,
  onPick,
  showPlaceholder,
  toPage,
  bp,
  slidesPerView,
  spaceBetween,
  loop,
  centeredSlides,
  grabCursor,
  autoplay,
  pagination,
  navigation,
  allowTouchMove = true,
  modules,
  sliderClassName,
  slideClassName,
  mediaContainerClassName,
  imageFillClassName,
  imagePlaceholderClassName,
  imageClassName,
}) => {
  return (
    <>
      <Swiper
        breakpoints={bp ? bp : undefined}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        centeredSlides={centeredSlides}
        grabCursor={grabCursor}
        autoplay={autoplay}
        pagination={pagination}
        navigation={navigation}
        allowTouchMove={allowTouchMove}
        modules={modules}
        className={`${sliderClassName} slider-navigation`}
      >
        {navigation && (
          <>
            <div
              className={`swiper-button image-swiper-button-prev ${
                showPlaceholder ? 'no-show' : undefined
              }`}
            >
              <FaArrowLeft />
            </div>
            <div
              className={`swiper-button image-swiper-button-next ${
                showPlaceholder ? 'no-show' : undefined
              }`}
            >
              <FaArrowRight />
            </div>
          </>
        )}
        {/* TODO: update */}
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className={slideClassName}
            onClick={onPick ? () => onPick({ variantId: slide.id }) : undefined}
          >
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
              />
            ) : (
              <div style={{ paddingTop: '144%', background: 'grey' }} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSlider;
