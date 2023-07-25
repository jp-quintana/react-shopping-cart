import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import 'swiper/css';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import MediaContainer from '../MediaContainer';

import './sliderStyles.css';

const Slider = ({
  slides,
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
  clearPlaceholders,
  showPlaceholder,
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
        {navigation && !showPlaceholder && (
          <>
            <div className="swiper-button image-swiper-button-prev">
              <FaArrowLeft />
            </div>
            <div className="swiper-button image-swiper-button-next">
              <FaArrowRight />
            </div>
          </>
        )}
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={slideClassName}>
            <MediaContainer
              image={slide.src}
              to={slide.url}
              alt={slide.alt || ''}
              clearPlaceholders={clearPlaceholders}
              containerClassName={mediaContainerClassName}
              fillClassName={imageFillClassName}
              placeholderClassName={imagePlaceholderClassName}
              mediaClassName={imageClassName}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
