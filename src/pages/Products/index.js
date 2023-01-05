import { useState, useEffect } from 'react';

import { useProductContext } from 'hooks/useProductContext';
// import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';

import ProductVariant from './ProductVariant';
import ProductSize from './ProductSize';

import Button from 'common/Button';
import Loader from 'common/Loader';
import NotificationModal from 'common/NotificationModal';

import { formatNumber } from 'helpers/format';

import styles from './index.module.scss';

const Products = () => {
  const {
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
    // const item = items.find((item) => item.sku === selectedSku);
    // if (item && item.amount >= selectedStock) {
    //   return;
    // }
    await addItem({
      // TODO: INVENTORY
      productId: selectedProduct.id,
      id: selectedSku,
      size: selectedSize,
      name: selectedProduct.model,
      type: selectedProduct.type,
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
        setNotificationModal({ error, details: error.message });
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

  return (
    <>
      {notificationModal && (
        <NotificationModal
          toggleNotificationModal={toggleNotificationModal}
          content={notificationModal}
        />
      )}
      {!selectedVariant && <Loader />}
      {selectedVariant && (
        <section className={`${styles.container} main-container`}>
          <div className={styles.info_wrapper}>
            <div className={styles.info}>
              <h1 className={styles.name}>{selectedProduct.model}</h1>
              <p
                className={styles.details}
              >{`${selectedProduct.type} ${selectedVariant.color}`}</p>
              <p className={styles.price}>
                ${formatNumber(selectedVariant.price)}
              </p>

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
        </section>
      )}
    </>
  );
};

export default Products;
