import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'swiper/css';

import ImageContainer from '../ImageContainer';

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
  modules,
  sliderClassName,
  slideClassName,
  imageContainerClassName,
  imageFillClassName,
  imagePlaceholderClassName,
  imageClassName,
}) => {
  return (
    <>
      <Swiper
        breakpoints={bp}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        centeredSlides={centeredSlides}
        grabCursor={grabCursor}
        autoplay={autoplay}
        pagination={pagination}
        modules={modules}
        className={sliderClassName}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={slideClassName}>
            <ImageContainer
              src={slide.src}
              to={slide.url}
              alt={slide.alt || ''}
              containerClassName={imageContainerClassName}
              fillClassName={imageFillClassName}
              placeholderClassName={imagePlaceholderClassName}
              imageClassName={imageClassName}
            />
            {/* <img src={slide.src} alt="" className={imageClassName} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
