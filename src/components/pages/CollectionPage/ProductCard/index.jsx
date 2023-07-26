import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from 'swiper';

import { useCart } from 'hooks/useCart';

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
  skus,
  isSoldOut,
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.split('/')[1] === 'admin';

  const { addItem, isLoading } = useCart();

  const [showDetailsPlaceholder, setDetailsShowPlaceholder] = useState(true);

  const handleAddItem = async ({ skuId, size }) => {
    await addItem({
      skuId,
      productId,
      variantId,
      size,
      model,
      type,
      color,
      price: currentPrice,
      slug: slides[0].url,
      image: slides[0].src,
    });
  };

  return (
    <>
      <div className={styles.container}>
        {!showDetailsPlaceholder && (
          <div className={styles.tag_container}>
            {isSoldOut && <span className={styles.sold_out}>Sold Out</span>}
            {currentPrice < actualPrice && (
              <span className={styles.discount}>-{discount}%</span>
            )}
          </div>
        )}
        <div className={styles.slider_container}>
          <>
            <Slider
              clearPlaceholders={() => setDetailsShowPlaceholder(false)}
              showPlaceholder={showDetailsPlaceholder}
              slides={slides}
              toPage={'/products/'}
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
            />
            {!showDetailsPlaceholder && (
              <QuickAdd
                skus={skus}
                handleAddItem={handleAddItem}
                isLoading={isLoading}
                containerClassName={styles.quick_add_container}
                wrapperClassName={styles.quick_add_wrapper}
                topContainerClassName={styles.quick_add_top}
                bottomContainerClassName={styles.quick_add_bottom}
              />
            )}
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
