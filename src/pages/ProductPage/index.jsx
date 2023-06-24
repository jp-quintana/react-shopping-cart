import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper';

import { useProductContext } from 'hooks/useProductContext';
import { useCart } from 'hooks/useCart';

import ProductColors from 'components/pages/product/ProductColors';
import ProductSize from 'components/pages/product/ProductSize';
import ProductTags from 'components/pages/product/ProductTags';

import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import Slider from 'components/common/Slider';
import ImageContainer from 'components/common/ImageContainer';
import Toast from 'components/common/Toast';
import ToastMessage from 'components/common/ToastMessage';

import { formatNumber } from 'helpers/format';

import styles from './index.module.scss';

const ProductPage = () => {
  const {
    productIsReady,
    selectedProduct,
    selectedVariant,
    selectedSize,
    selectedSkuId,
  } = useProductContext();

  const { addItem, isLoading, error } = useCart();

  const [notification, setNotification] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleAddToCart = async () => {
    // console.log('aca', {
    //   productId: selectedProduct.productId,
    //   variantId: selectedVariant.variantId,
    //   skuId: selectedSkuId,
    //   id: selectedSkuId,
    //   size: selectedSize,
    //   model: selectedProduct.model,
    //   type: selectedProduct.type,
    //   color: selectedVariant.color,
    //   price: selectedVariant.variantPrice,
    //   slug: selectedProduct.slug + '-' + selectedVariant.color,
    //   image: selectedVariant.images[0].src,
    // });
    await addItem({
      productId: selectedProduct.productId,
      variantId: selectedVariant.variantId,
      skuId: selectedSkuId,
      id: selectedSkuId,
      size: selectedSize,
      model: selectedProduct.model,
      type: selectedProduct.type,
      color: selectedVariant.color,
      price: selectedVariant.variantPrice,
      slug: selectedProduct.slug + '-' + selectedVariant.color,
      image: selectedVariant.images[0].src,
    });
    setNotification(true);
  };

  useEffect(() => {
    if (notification) {
      if (!error) {
        setToastMessage({
          addToCartSuccess: true,
          thumbnail: selectedVariant.images[0].src,
          details: `${selectedProduct.type} ${selectedProduct.model} - ${
            selectedVariant.color
          } - ${selectedSize.toUpperCase()}`,
        });
      } else if (error) {
        setToastMessage({ error, details: error.details });
      }

      setNotification(false);
    }
  }, [notification]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  let addEventHandler = false;
  if (selectedSize.length > 0) {
    addEventHandler = true;
  }

  const buttonContent =
    selectedSize.length === 0
      ? 'SELECT SIZE'
      : `ADD ${selectedSize.toUpperCase()} TO BAG`;

  const buttonStyles = `
    ${selectedSize.length === 0 ? styles.button_disabled : styles.button}
  `;

  const isButtonDisabled = selectedSize.length === 0 ? true : false;

  const isBigScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      {!productIsReady && <Loader />}
      {productIsReady && (
        <>
          {!isBigScreen && (
            <>
              <section>
                <div className={styles.container_s}>
                  <div className={styles.slider_container}>
                    <div className={styles.slider_wrapper}>
                      <Slider
                        slides={selectedVariant.images}
                        bp={{
                          500: {
                            slidesPerView: 1.5,
                          },
                          600: {
                            slidesPerView: 1.7,
                          },
                          800: {
                            slidesPerView: 2,
                          },
                        }}
                        slidesPerView={1.3}
                        spaceBetween={30}
                        loop={true}
                        centeredSlides={true}
                        grabCursor={true}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Pagination]}
                        sliderClassName={styles.slider}
                        slideClassName={styles.slide}
                        imageContainerClassName={styles.image_container}
                        imageFillClassName={styles.image_fill}
                        imageClassName={styles.image}
                      />
                    </div>
                  </div>
                  <div className={styles.grid_footer}>
                    <div className={styles.details_wrapper}>
                      <div className={styles.details}>
                        <div className={styles.name_wrapper}>
                          <h1 className={styles.name}>
                            {selectedProduct.model}
                          </h1>
                        </div>
                        <p className={styles.description}>
                          {selectedProduct.description}
                        </p>
                        <p className={styles.color}>{selectedVariant.color}</p>
                        {(selectedProduct.tags ||
                          selectedVariant.variantPrice <
                            selectedProduct.price) && (
                          <ProductTags
                            currentPrice={selectedVariant.variantPrice}
                            actualPrice={selectedProduct.price}
                          />
                        )}
                      </div>
                      <div className={styles.price_wrapper}>
                        {selectedVariant.variantPrice <
                        selectedProduct.price ? (
                          <>
                            <span className={styles.discounted_price}>
                              ${formatNumber(selectedVariant.variantPrice)}
                            </span>
                            <span className={styles.crossed_price}>
                              ${formatNumber(selectedProduct.price)}
                            </span>
                          </>
                        ) : (
                          formatNumber(selectedProduct.currentPrice)
                        )}
                      </div>
                    </div>

                    <div className={styles.controls_wrapper}>
                      <div className={styles.variants_container}>
                        <p className={styles.number_of_colors}>
                          {selectedProduct.variants.length}{' '}
                          {selectedProduct.variants.length > 1
                            ? 'Colors'
                            : 'Color'}{' '}
                          <span>| {selectedVariant.color}</span>
                        </p>
                        <div className={styles.variants_wrapper}>
                          {selectedProduct.variants.map((variant) => (
                            <ProductColors
                              key={variant.color}
                              id={variant.color}
                              thumbnail={variant.images[0].src}
                              selectedColor={selectedVariant.color}
                            />
                          ))}
                        </div>
                      </div>

                      <div className={styles.sizes_container}>
                        <p className={styles.pick_size}>Select Size</p>

                        <div className={styles.sizes_wrapper}>
                          {selectedVariant.sizes.map((size) => (
                            <ProductSize
                              key={size.skuId}
                              skuId={size.skuId}
                              value={size.value}
                              quantity={size.quantity}
                              selectedSize={selectedSize}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.button_wrapper}>
                      {!isLoading && (
                        <Button
                          className={buttonStyles}
                          disabled={isButtonDisabled}
                          onClick={
                            addEventHandler ? handleAddToCart : undefined
                          }
                        >
                          {buttonContent}
                        </Button>
                      )}
                      {isLoading && (
                        <Button className={buttonStyles} disabled={true}>
                          {buttonContent}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {isBigScreen && (
            <>
              <section className="main-container">
                <div className={styles.container_b}>
                  <div className={styles.details_wrapper}>
                    <div className={styles.details}>
                      <h1 className={styles.name}>{selectedProduct.model}</h1>
                      <p className={styles.description}>
                        {selectedProduct.description}
                      </p>
                      <p className={styles.color}>{selectedVariant.color}</p>
                      {(selectedProduct.tags ||
                        selectedVariant.variantPrice <
                          selectedProduct.price) && (
                        <ProductTags
                          currentPrice={selectedVariant.variantPrice}
                          actualPrice={selectedProduct.price}
                        />
                      )}
                      <div className={styles.price_wrapper}>
                        {selectedVariant.variantPrice <
                        selectedProduct.price ? (
                          <>
                            <span className={styles.discounted_price}>
                              ${formatNumber(selectedVariant.variantPrice)}
                            </span>
                            <span className={styles.crossed_price}>
                              ${formatNumber(selectedProduct.price)}
                            </span>
                          </>
                        ) : (
                          formatNumber(selectedProduct.currentPrice)
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.images}>
                    {selectedVariant.images.map((image) => (
                      <ImageContainer
                        key={image.id}
                        src={image.src}
                        alt=""
                        containerClassName={styles.image_container}
                        fillClassName={styles.image_fill}
                      />
                    ))}
                  </div>

                  <div className={styles.controls_wrapper}>
                    <div className={styles.variants_container}>
                      <p className={styles.number_of_colors}>
                        {selectedProduct.variants.length}{' '}
                        {selectedProduct.variants.length > 1
                          ? 'Colors'
                          : 'Color'}{' '}
                        <span>| {selectedVariant.color}</span>
                      </p>
                      <div className={styles.variants_wrapper}>
                        {selectedProduct.variants.map((variant) => (
                          <ProductColors
                            key={variant.color}
                            id={variant.color}
                            thumbnail={variant.images[0].src}
                            selectedColor={selectedVariant.color}
                          />
                        ))}
                      </div>
                    </div>

                    <div className={styles.sizes_container}>
                      <p className={styles.pick_size}>Select Size</p>

                      <div className={styles.sizes_wrapper}>
                        {selectedVariant.sizes.map((size) => (
                          <ProductSize
                            key={size.skuId}
                            skuId={size.skuId}
                            value={size.value}
                            quantity={size.quantity}
                            selectedSize={selectedSize}
                          />
                        ))}
                      </div>
                    </div>

                    {!isLoading && (
                      <Button
                        className={buttonStyles}
                        disabled={isButtonDisabled}
                        onClick={addEventHandler ? handleAddToCart : undefined}
                      >
                        {buttonContent}
                      </Button>
                    )}
                    {isLoading && (
                      <Button className={buttonStyles} disabled={true}>
                        {buttonContent}
                      </Button>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductPage;
