import ProductVariant from './ProductVariant';
import ProductSize from './ProductSize';
import Button from 'common/Button';

import styles from './index.module.scss';

const Product = (props) => {
  const {
    selectedVariant,
    selectedSize,
    productName,
    variants,
    type,
    color,
    price,
    inventoryLevels,
    images,
    onSelectVariant,
    onSelectSize,
  } = props;

  let shouldAddEventHandler = false;
  if (selectedSize.length > 0) {
    shouldAddEventHandler = true;
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
    <div className={`${styles.container} main-container`}>
      <div className={styles.info_wrapper}>
        <div className={styles.info}>
          <h1 className={styles.name}>{productName}</h1>
          <p className={styles.details}>{`${type} ${color}`}</p>
          <p className={styles.price}>${price}</p>

          <div className={styles.variants_wrapper}>
            {variants.map((variant) => (
              <ProductVariant
                key={variant.variantId}
                id={variant.variantId}
                thumbnail={variant.productThumbnail}
                onSelectVariant={onSelectVariant}
                selectedVariant={selectedVariant}
              />
            ))}
          </div>

          <div className={styles.sizes_wrapper}>
            {inventoryLevels.map((size) => (
              <ProductSize
                key={size.id}
                value={size.value}
                stock={size.stock}
                selectedSize={selectedSize}
                onSelectSize={onSelectSize}
              />
            ))}
          </div>

          <Button
            className={buttonStyles}
            disabled={isButtonDisabled}
            onClick={
              shouldAddEventHandler
                ? () => console.log('Added to cart')
                : undefined
            }
          >
            {buttonContent}
          </Button>
        </div>
      </div>

      <div className={styles.images_wrapper}>
        {images.map((image) => (
          <img
            className={styles.images}
            key={image.id}
            src={image.src}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
