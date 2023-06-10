import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper';

import { useProductContext } from 'hooks/useProductContext';
import { useCart } from 'hooks/useCart';

import ProductVariant from 'components/pages/products/ProductVariant';
import ProductSize from 'components/pages/products/ProductSize';

import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import Slider from 'components/common/Slider';
import ImageContainer from 'components/common/ImageContainer';
import Toast from 'components/common/Toast';
import ToastMessage from 'components/common/ToastMessage';

import { formatNumber } from 'helpers/format';

import styles from './index.module.scss';

const Products = () => {
  const {
    productIsReady,
    selectedProduct,
    selectedVariant,
    selectedSize,
    selectedSku,
    // selectedStock,
  } = useProductContext();

  const { addItem, isLoading, error } = useCart();

  const [notification, setNotification] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleAddToCart = async () => {
    await addItem({
      productId: selectedProduct.id,
      variantId: selectedVariant.id,
      id: selectedSku,
      size: selectedSize,
      model: selectedProduct.model,
      type: selectedProduct.type,
      description: selectedProduct.description,
      color: selectedVariant.color,
      price: selectedVariant.currentPrice,
      slug: selectedVariant.slug,
      thumbnail: selectedVariant.images[0].src,
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

  // TODO: HACER QUE EL TEXT EN LOS COSTADOS SE DESPLACE APENAS HAY EVENTO DE SCROLL

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
                          <p className={styles.price}>
                            ${formatNumber(selectedVariant.currentPrice)}
                          </p>
                        </div>
                        <p className={styles.description}>
                          {selectedProduct.description}
                        </p>
                        <p className={styles.color}>{selectedVariant.color}</p>
                        {selectedProduct.tags && (
                          <div className={styles.tags_wrapper}>
                            {selectedProduct.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={
                                  tag.content === 'nuevo'
                                    ? styles.tag_alt
                                    : styles.tag
                                }
                              >
                                {tag.content}
                              </span>
                            ))}
                          </div>
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
                            <ProductVariant
                              key={variant.id}
                              id={variant.id}
                              thumbnail={variant.images[0].src}
                              selectedVariantId={selectedVariant.id}
                            />
                          ))}
                        </div>
                      </div>

                      <div className={styles.sizes_container}>
                        <p className={styles.pick_size}>Select Size</p>

                        <div className={styles.sizes_wrapper}>
                          {selectedVariant.inventoryLevels.map((size) => (
                            <ProductSize
                              key={size.sku}
                              id={size.sku}
                              value={size.value}
                              stock={size.stock}
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
                      {selectedProduct.tags && (
                        <div className={styles.tags_wrapper}>
                          {selectedProduct.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={
                                tag.content === 'nuevo'
                                  ? styles.tag_alt
                                  : styles.tag
                              }
                            >
                              {tag.content}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className={styles.price}>
                        ${formatNumber(selectedVariant.currentPrice)}
                      </p>
                    </div>
                  </div>

                  <div className={styles.images}>
                    {selectedVariant.images.map((image) => (
                      <div key={image.id} className={styles.card}>
                        <ImageContainer
                          containerClassName={styles.image_container}
                          imageClassName={styles.image}
                          src={image.src}
                          alt=""
                        />
                      </div>
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
                          <ProductVariant
                            key={variant.id}
                            id={variant.id}
                            thumbnail={variant.images[0].src}
                            selectedVariantId={selectedVariant.id}
                          />
                        ))}
                      </div>
                    </div>

                    <div className={styles.sizes_container}>
                      <p className={styles.pick_size}>Select Size </p>

                      <div className={styles.sizes_wrapper}>
                        {selectedVariant.inventoryLevels.map((size) => (
                          <ProductSize
                            key={size.sku}
                            id={size.sku}
                            value={size.value}
                            stock={size.stock}
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

export default Products;
