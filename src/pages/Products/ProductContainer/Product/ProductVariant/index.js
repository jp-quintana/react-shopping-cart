import styles from './index.module.scss';

const ProductVariant = ({
  id,
  thumbnail,
  selectedVariantId,
  dispatchProductAction,
}) => {
  let shouldAddEventHandler = false;
  if (selectedVariantId !== id) {
    shouldAddEventHandler = true;
  }

  const handleSelectVariant = () => {
    if (id === selectedVariantId) {
      return;
    }
    dispatchProductAction({ type: 'SELECT_PRODUCT_VARIANT', payload: id });
  };

  let variantStyles =
    selectedVariantId === id ? styles.thumbnail_selected : styles.thumbnail;

  return (
    <img
      className={variantStyles}
      onClick={shouldAddEventHandler ? handleSelectVariant : undefined}
      src={thumbnail}
      alt=""
    />
  );
};

export default ProductVariant;
