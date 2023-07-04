import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'swiper/css';

import MediaContainer from '../MediaContainer';

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
  MediaContainerClassName,
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
            <MediaContainer
              image={slide.src}
              to={slide.url}
              alt={slide.alt || ''}
              containerClassName={MediaContainerClassName}
              fillClassName={imageFillClassName}
              placeholderClassName={imagePlaceholderClassName}
              mediaClassName={imageClassName}
            />
            {/* <img src={slide.src} alt="" className={imageClassName} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
