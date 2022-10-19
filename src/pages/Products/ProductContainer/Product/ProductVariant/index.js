import styles from './index.module.scss';

const ProductVariant = ({
  id,
  thumbnail,
  selectedVariant,
  onSelectVariant,
}) => {
  let shouldAddEventHandler = false;
  if (selectedVariant.variantId !== id) {
    shouldAddEventHandler = true;
  }

  const handleSelectVariant = () => {
    onSelectVariant(id);
  };

  let variantStyles =
    selectedVariant.variantId === id
      ? styles.thumbnail_selected
      : styles.thumbnail;

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
