import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper';

import { useProductContext } from 'hooks/useProductContext';
import { useCart } from 'hooks/useCart';

import ProductColors from './ProductColors';
import ProductSize from './ProductSize';
import ProductTags from './ProductTags';

import {
  Button,
  Loader,
  Slider,
  MediaContainer,
  Toast,
  ToastMessage,
  NotFound,
} from 'components/common';

import { formatPrice } from 'helpers/format';

import styles from './index.module.scss';

const ProductPage = () => {
  const {
    productIsReady,
    selectedProduct,
    selectedVariant,
    selectedSize,
    selectedSkuId,
    singleSize,
  } = useProductContext();

  const { addItem, isLoading, error } = useCart();

  const [notify, setNotify] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleAddToCart = async () => {
    await addItem({
      productId: selectedProduct.productId,
      variantId: selectedVariant.variantId,
      skuId: selectedSkuId,
      size: selectedSize,
      model: selectedProduct.model,
      type: selectedProduct.type,
      color: selectedVariant.color,
      price: selectedVariant.variantPrice,
      slug: selectedProduct.slug + '-' + selectedVariant.color,
      image: selectedVariant.images[0].src,
    });
    setNotify(true);
  };

  useEffect(() => {
    if (notify) {
      if (!error) {
        setToastMessage({
          addToCartSuccess: true,
          image: selectedVariant.images[0].src,
          message: `${selectedProduct.model} ${selectedProduct.type} - ${
            selectedVariant.color
          } ${selectedSize ? ` - ${selectedSize.toUpperCase()}` : ''}`,
        });
      } else if (error) {
        setToastMessage({ error, message: error.message });
      }

      setNotify(false);
    }
  }, [notify]);

  let addEventHandler = false;

  if (singleSize) {
    if (singleSize.quantity > 0) {
      addEventHandler = true;
    }
  } else {
    if (selectedSize.length > 0) {
      addEventHandler = true;
    }
  }

  const buttonContent = singleSize
    ? singleSize.quantity > 0
      ? 'ADD TO BAG'
      : 'OUT OF STOCK'
    : selectedSize.length === 0
    ? 'SELECT SIZE'
    : `ADD ${selectedSize.toUpperCase()} TO BAG`;

  const buttonStyles = `
    ${
      singleSize
        ? singleSize.quantity > 0
          ? styles.button
          : styles.button_disabled
        : selectedSize.length === 0
        ? styles.button_disabled
        : styles.button
    }
  `;

  const isButtonDisabled = singleSize
    ? singleSize.quantity > 0
      ? false
      : true
    : selectedSize.length === 0
    ? true
    : false;

  const isBigScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <>
      <Toast content={toastMessage}>
        {toastMessage && (
          <ToastMessage
            close={() => setToastMessage(null)}
            content={toastMessage}
          />
        )}
      </Toast>
      {!productIsReady && (
        <>
          <div className={styles.loader_section} />
          <Loader />
        </>
      )}
      {productIsReady && !selectedVariant && (
        <section className="main-container">
          <NotFound />
        </section>
      )}
      {productIsReady && selectedVariant && (
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
                        mediaContainerClassName={styles.image_container}
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
                              ${formatPrice(selectedVariant.variantPrice)}
                            </span>
                            <span className={styles.crossed_price}>
                              ${formatPrice(selectedProduct.price)}
                            </span>
                          </>
                        ) : (
                          <span>${formatPrice(selectedProduct.price)}</span>
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
                              key={variant.variantId}
                              id={variant.variantId}
                              thumbnail={variant.images[0].src}
                              selectedId={selectedVariant.variantId}
                            />
                          ))}
                        </div>
                      </div>
                      {!singleSize && (
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
                      )}
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
                          <span className={styles.button_content_show}>
                            {buttonContent}
                          </span>
                        </Button>
                      )}
                      {isLoading && (
                        <Button className={buttonStyles} disabled={true}>
                          <span className={styles.button_loader}></span>
                          <span className={styles.button_content_no_show}>
                            {buttonContent}
                          </span>
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
                              ${formatPrice(selectedVariant.variantPrice)}
                            </span>
                            <span className={styles.crossed_price}>
                              ${formatPrice(selectedProduct.price)}
                            </span>
                          </>
                        ) : (
                          <span>${formatPrice(selectedProduct.price)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.images}>
                    {selectedVariant.images.map((image) => (
                      <MediaContainer
                        key={image.id}
                        image={image.src}
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
                            key={variant.variantId}
                            id={variant.variantId}
                            thumbnail={variant.images[0].src}
                            selectedId={selectedVariant.variantId}
                          />
                        ))}
                      </div>
                    </div>

                    {!singleSize && (
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
                    )}

                    {!isLoading && (
                      <Button
                        className={buttonStyles}
                        disabled={isButtonDisabled}
                        onClick={addEventHandler ? handleAddToCart : undefined}
                      >
                        <span className={styles.button_content_show}>
                          {buttonContent}
                        </span>
                      </Button>
                    )}
                    {isLoading && (
                      <Button className={buttonStyles} disabled={true}>
                        <span className={styles.button_loader}></span>
                        <span className={styles.button_content_no_show}>
                          {buttonContent}
                        </span>
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
