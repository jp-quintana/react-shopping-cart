import { useProduct } from 'hooks/useProduct';

import ImageContainer from 'components/common/ImageContainer';

import styles from './index.module.scss';

const ProductColors = ({ id, thumbnail, selectedColor }) => {
  const { selectVariant } = useProduct();

  let shouldAddEventHandler = false;
  if (selectedColor !== id) {
    shouldAddEventHandler = true;
  }

  const handleSelectVariant = () => {
    if (id === selectedColor) {
      return;
    }
    selectVariant(id);
  };

  let variantStyles =
    selectedColor === id ? styles.thumbnail_selected : styles.thumbnail;

  return (
    <ImageContainer
      src={thumbnail}
      alt=""
      onClick={shouldAddEventHandler ? handleSelectVariant : undefined}
      containerClassName={styles.image_container}
      fillClassName={styles.image_fill}
      imageClassName={variantStyles}
    />
  );
};

export default ProductColors;