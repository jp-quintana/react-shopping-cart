import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';

import ProductVariant from './ProductVariant';
import ProductSize from './ProductSize';
import Button from 'common/Button';

import styles from './index.module.scss';

const Product = ({
  productName,
  variants,
  type,
  color,
  price,
  url,
  images,
  inventoryLevels,
  onSelectSize,
  dispatch: dispatchProductAction,
  selectedVariantId,
  selectedSku,
  selectedSize,
  selectedStock,
}) => {
  const { items } = useCartContext();
  const { addItem, isLoading, error } = useCart();

  let addEventHandler = false;
  if (selectedSize.length > 0) {
    addEventHandler = true;
  }

  const handleAddToCart = async () => {
    const item = items.find((item) => item.sku === selectedSku);
    if (item && item.amount >= selectedStock) {
      return;
    }
    addItem({
      sku: selectedSku,
      name: productName,
      size: selectedSize,
      type,
      color,
      price: price.raw,
      url,
      images,
    });
  };

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
          <p className={styles.price}>${price.html}</p>

          <div className={styles.variants_wrapper}>
            {variants.map((variant) => (
              <ProductVariant
                key={variant.variantId}
                id={variant.variantId}
                thumbnail={variant.productThumbnail}
                dispatchProductAction={dispatchProductAction}
                selectedVariantId={selectedVariantId}
              />
            ))}
          </div>

          <div className={styles.sizes_wrapper}>
            {inventoryLevels.map((size) => (
              <ProductSize
                key={size.sku}
                sku={size.sku}
                value={size.value}
                stock={size.stock}
                selectedSize={selectedSize}
                onSelectSize={onSelectSize}
                dispatchProductAction={dispatchProductAction}
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
            <Button className={buttonStyles}>{buttonContent}</Button>
          )}
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
