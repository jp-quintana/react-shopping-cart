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
    <div
      onClick={shouldAddEventHandler ? handleSelectVariant : undefined}
      className={styles.card}
    >
      <ImageContainer
        src={thumbnail}
        alt=""
        containerClassName={styles.image_container}
        imageClassName={variantStyles}
      />
    </div>
    // <img
    //   className={variantStyles}
    //   onClick={shouldAddEventHandler ? handleSelectVariant : undefined}
    //   src={thumbnail}
    //   alt=""
    // />
  );
};

export default ProductVariant;
