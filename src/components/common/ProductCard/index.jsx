import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from 'swiper';
import { useMediaQuery } from 'react-responsive';

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
  allVariants,
  nested,
  onTouchStart,
  onTouchEnd,
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.split('/')[1] === 'admin';

  const { addItem, isLoading } = useCart();

  const [currentVariant, setCurrentVariant] = useState({
    variantId,
    color,
    currentPrice,
    discount,
    slides,
    skus,
    isSoldOut,
  });

  const [showDetailsPlaceholder, setDetailsShowPlaceholder] = useState(true);

  const handlePickVariant = ({ variantId }) => {
    const selectedVariant = allVariants.find(
      (variant) => variant.variantId === variantId
    );

    setCurrentVariant({
      variantId,
      color: selectedVariant.color,
      currentPrice: selectedVariant.price,
      discount: selectedVariant.discount,
      slides: selectedVariant.slides,
      skus: selectedVariant.skus,
      isSoldOut: selectedVariant.isSoldOut,
    });
  };

  const handleAddItem = async ({ skuId, size }) => {
    await addItem({
      skuId,
      productId: productId,
      variantId: currentVariant.variantId,
      size,
      model: model,
      type: type,
      color: currentVariant.color,
      price: currentVariant.currentPrice,
      slug: currentVariant.slides[0].url,
      image: currentVariant.slides[0].src,
    });
  };

  // TODO: udpate
  const allVariantSlides = allVariants.map((variant) => ({
    ...variant.slides[0],
    id: variant.variantId,
    url: null,
    // variantId: variant.variantId,
  }));
  // const allVariantSlides = [];

  const isBigScreen = useMediaQuery({
    query: '(min-width: 520px)',
  });

  return (
    <>
      <div className={styles.container}>
        {!showDetailsPlaceholder && (
          <div className={styles.tag_container}>
            {currentVariant.isSoldOut && (
              <span className={styles.sold_out}>Sold Out</span>
            )}
            {currentVariant.currentPrice < actualPrice && (
              <span className={styles.discount}>
                -{currentVariant.discount}%
              </span>
            )}
          </div>
        )}
        <div className={styles.slider_container}>
          <>
            <Slider
              clearPlaceholders={() => setDetailsShowPlaceholder(false)}
              showPlaceholder={showDetailsPlaceholder}
              slides={currentVariant.slides}
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
            {!showDetailsPlaceholder && isBigScreen && (
              <QuickAdd
                skus={currentVariant.skus}
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

        <div className={styles.info_wrapper}>
          <div
            className={styles.expandable_container}
            style={{ opacity: showDetailsPlaceholder && 0 }}
          >
            <div className={styles.expandable}>
              <Slider
                clearPlaceholders={() => setDetailsShowPlaceholder(false)}
                onPick={handlePickVariant}
                showPlaceholder={showDetailsPlaceholder}
                slides={allVariantSlides}
                nested={nested}
                slidesPerView="auto"
                spaceBetween={5}
                pagination={{
                  clickable: true,
                }}
                allowTouchMove={true}
                modules={[Navigation]}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                sliderClassName={styles.other_variants_slider}
                slideClassName={styles.other_variants_slide}
                mediaContainerClassName={styles.other_variants_image_container}
                imageFillClassName={styles.other_variants_image_fill}
                imageClassName={styles.other_variants_image}
              />
            </div>
          </div>
          <ul
            className={styles.info_list}
            style={{ opacity: showDetailsPlaceholder && 1 }}
          >
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
                  <span className={styles.text}>{currentVariant.color}</span>
                  {numberOfVariants > 1 && (
                    <span
                      className={styles.tag}
                    >{`${numberOfVariants} colors`}</span>
                  )}
                </li>
                <li className={styles.price}>
                  {currentVariant.currentPrice < actualPrice ? (
                    <>
                      <span className={styles.discounted_price}>
                        ${formatPrice(currentVariant.currentPrice)}
                      </span>
                      <span className={styles.crossed_price}>
                        ${formatPrice(actualPrice)}
                      </span>
                    </>
                  ) : (
                    <span>${formatPrice(currentVariant.currentPrice)}</span>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>

        {/* {isAdmin && (
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
        )} */}
      </div>
    </>
  );
};

export default ProductCard;
