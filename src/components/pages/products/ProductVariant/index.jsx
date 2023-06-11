import { useProduct } from 'hooks/useProduct';

import ImageContainer from 'components/common/ImageContainer';

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
    <ImageContainer
      src={thumbnail}
      alt=""
      onClick={shouldAddEventHandler ? handleSelectVariant : undefined}
      containerClassName={styles.image_container}
      fillClassName={styles.image_fill}
      imageClassName={variantStyles}
    />
    // <img
    //   className={variantStyles}
    //   onClick={shouldAddEventHandler ? handleSelectVariant : undefined}
    //   src={thumbnail}
    //   alt=""
    // />
  );
};

export default ProductVariant;
