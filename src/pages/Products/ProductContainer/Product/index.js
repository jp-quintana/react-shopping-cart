import ProductVariant from './ProductVariant';
import ProductSize from './ProductSize';
import Button from 'common/Button';

import styles from './index.module.scss';

const Product = (props) => {
  const {
    variants,
    model,
    type,
    color,
    price,
    inventoryLevels,
    images,
    selectedVariant,
    size,
    onSelectVariant,
    onSelectSize,
  } = props;

  let shouldAddEventHandler = false;
  if (size.length > 0) {
    shouldAddEventHandler = true;
  }

  const buttonContent =
    size.length === 0 ? 'SELECCIONAR TALLE' : `AGREGAR ${size} AL CARRITO`;
  const buttonStyles = `
    ${size.length === 0 ? styles.button_disabled : styles.button}
  `;

  const isButtonDisabled = size.length === 0 ? true : false;

  return (
    <div className={`${styles.container} main-container`}>
      <div className={styles.info_wrapper}>
        <div className={styles.info}>
          <h1 className={styles.name}>{model}</h1>
          <p className={styles.details}>{`${type} ${color}`}</p>
          <p className={styles.price}>${price}</p>

          <div className={styles.variants_wrapper}>
            {variants.map((variant) => (
              <ProductVariant
                key={variant.productId}
                id={variant.productId}
                thumbnail={variant.productThumbnail}
                onSelectVariant={onSelectVariant}
                selectedVariant={selectedVariant}
              />
            ))}
          </div>

          <div className={styles.sizes_wrapper}>
            {inventoryLevels.map((individualSize) => (
              <ProductSize
                key={individualSize.id}
                value={individualSize.value}
                stock={individualSize.stock}
                size={size}
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
