import { useProduct } from 'hooks/useProduct';

import Image from 'components/common/Image';

import styles from './index.module.scss';

const ProductVariant = ({ id, thumbnail, selectedVariantId }) => {
  const { selectVariant } = useProduct();

  let shouldAddEventHandler = false;
  if (selectedVariantId !== id) {
    shouldAddEventHandler = true;
  }

  const handleSelectVariant = () => {
    if (id === selectedVariantId) {
      return;
    }
    selectVariant(id);
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
