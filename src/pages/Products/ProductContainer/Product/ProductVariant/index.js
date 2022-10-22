import styles from './index.module.scss';

const ProductVariant = ({
  id,
  thumbnail,
  onSelectVariant,
  selectedVariantId,
}) => {
  let shouldAddEventHandler = false;
  if (selectedVariantId !== id) {
    shouldAddEventHandler = true;
  }

  const handleSelectVariant = () => {
    onSelectVariant(id);
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
