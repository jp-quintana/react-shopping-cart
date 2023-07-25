import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { Navigation } from 'swiper';

import QuickAdd from './QuickAdd';
import { Button, Slider } from 'components/common';

import { formatPrice } from 'helpers/format';

import styles from './index.module.scss';

const ProductCard = ({
  productId,
  variantId,
  model,
  color,
  currentPrice,
  actualPrice,
  type,
  discount,
  slides,
  numberOfVariants,
  handleDeleteStart,
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.split('/')[1] === 'admin';

  const [showDetailsPlaceholder, setDetailsShowPlaceholder] = useState(true);

  return (
    <>
      <div className={styles.container}>
        {!showDetailsPlaceholder && currentPrice < actualPrice && (
          <span className={styles.discount}>-{discount}%</span>
        )}
        <div className={styles.slider_container}>
          <>
            <Slider
              clearPlaceholders={() => setDetailsShowPlaceholder(false)}
              slides={slides}
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: '.image-swiper-button-next',
                prevEl: '.image-swiper-button-prev',
                disabledClass: 'swiper-button-disabled',
              }}
              allowTouchMove={false}
              modules={[Navigation]}
              sliderClassName={styles.slider}
              slideClassName={styles.slide}
              mediaContainerClassName={styles.image_container}
              imageFillClassName={styles.image_fill}
              imageClassName={styles.image}
              showPlaceholder={showDetailsPlaceholder}
            />
            <QuickAdd
              containerClassName={styles.quick_add_container}
              topContainerClassName={styles.quick_add_top}
            />
          </>
        </div>

        <ul className={styles.info_wrapper}>
          {showDetailsPlaceholder && (
            <>
              <li className={styles.title_placeholder} />
              <li className={styles.color_placeholder} />
              <li className={styles.price_placeholder} />
            </>
          )}
          {!showDetailsPlaceholder && (
            <>
              <li className={styles.title}>
                {model} {type}
              </li>
              <li className={styles.color}>
                <span className={styles.text}>{color}</span>
                {numberOfVariants > 1 && (
                  <span
                    className={styles.tag}
                  >{`${numberOfVariants} colors`}</span>
                )}
              </li>
              <li className={styles.price}>
                {currentPrice < actualPrice ? (
                  <>
                    <span className={styles.discounted_price}>
                      ${formatPrice(currentPrice)}
                    </span>
                    <span className={styles.crossed_price}>
                      ${formatPrice(actualPrice)}
                    </span>
                  </>
                ) : (
                  <span>${formatPrice(currentPrice)}</span>
                )}
              </li>
            </>
          )}
        </ul>
        {isAdmin && (
          <div className={styles.admin_buttons_wrapper}>
            <Button className={styles.edit} to={`/admin/products/${productId}`}>
              Edit
            </Button>
            <Button
              onClick={() =>
                handleDeleteStart({
                  productId,
                  variantId,
                })
              }
              className={styles.delete}
              type="button"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
