import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useProductContext } from 'hooks/useProductContext';
// import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';

import ProductVariant from './ProductVariant';
import ProductSize from './ProductSize';

import Button from 'common/Button';
import Loader from 'common/Loader';
import Slider from 'common/Slider';
import NotificationModal from 'common/NotificationModal';

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
  const [notificationModal, setNotificationModal] = useState(null);

  const handleAddToCart = async () => {
    await addItem({
      productId: selectedProduct.id,
      id: selectedSku,
      size: selectedSize,
      model: selectedProduct.model,
      type: selectedProduct.type,
      description: selectedProduct.description,
      color: selectedVariant.color,
      price: selectedVariant.price,
      url: selectedVariant.url,
      thumbnail: selectedVariant.images[0].src,
    });

    setNotification(true);
  };

  useEffect(() => {
    if (notification) {
      if (!error) {
        setNotificationModal({
          addToCartSuccess: true,
          _thumbnail: selectedVariant.images[0].src,
          details: `${selectedProduct.type} ${selectedProduct.model} ${selectedVariant.color} - ${selectedSize}`,
        });
      } else if (error) {
        setNotificationModal({ error, details: error.details });
      }

      setNotification(false);
    }
  }, [notification]);

  const toggleNotificationModal = () => {
    setNotificationModal(null);
  };

  let addEventHandler = false;
  if (selectedSize.length > 0) {
    addEventHandler = true;
  }

  const buttonContent =
    selectedSize.length === 0
      ? 'SELECCIONAR TALLE'
      : `AGREGAR ${selectedSize} AL CARRITO`;

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
      {notificationModal && (
        <NotificationModal
          toggleNotificationModal={toggleNotificationModal}
          content={notificationModal}
        />
      )}
      {!productIsReady && <Loader />}
      {productIsReady && (
        <section className="main-container">
          <div className={styles.container}>
            {!isBigScreen && (
              <div className={styles.swiper_container}>
                <div className={styles.swiper_wrapper}>
                  <Slider
                    slides={selectedVariant.images}
                    slidesPerView={4}
                    sliderClassName={styles.slider}
                    slideClassName={styles.slide}
                    imageClassName={styles.image}
                  />
                </div>
              </div>
            )}
            <div className={styles.details_wrapper}>
              <div className={styles.details}>
                <h1 className={styles.name}>{selectedProduct.model}</h1>
                <p className={styles.description}>
                  {selectedProduct.description}
                </p>
                <p className={styles.color}>{selectedVariant.color}</p>
                {selectedProduct.tags && (
                  <div className={styles.tags_wrapper}>
                    {selectedProduct.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className={
                          tag.content === 'nuevo' ? styles.tag_alt : styles.tag
                        }
                      >
                        {tag.content}
                      </span>
                    ))}
                  </div>
                )}
                <p className={styles.price}>
                  ${formatNumber(selectedVariant.price)}
                </p>
              </div>
            </div>

            {isBigScreen && (
              <div className={styles.images_wrapper}>
                {selectedVariant.images.map((image) => (
                  <img
                    className={styles.images}
                    key={image.id}
                    src={require(`assets/${image.src}`)}
                    alt=""
                  />
                ))}
              </div>
            )}

            <div className={styles.controls_wrapper}>
              <div className={styles.variants_wrapper}>
                {selectedProduct.variants.map((variant) => (
                  <ProductVariant
                    key={variant.variantId}
                    id={variant.variantId}
                    _thumbnail={variant.images[0].src}
                    selectedVariantId={selectedVariant.variantId}
                  />
                ))}
              </div>

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
      )}
    </>
  );
};

export default Products;
