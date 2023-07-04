import { useProduct } from 'hooks/useProduct';

import { MediaContainer } from 'components/common';

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
    <MediaContainer
      image={thumbnail}
      alt=""
      onClick={shouldAddEventHandler ? handleSelectVariant : undefined}
      containerClassName={styles.image_container}
      fillClassName={styles.image_fill}
      mediaClassName={variantStyles}
    />
  );
};

export default ProductColors;
