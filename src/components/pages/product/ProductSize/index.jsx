import { useProduct } from 'hooks/useProduct';

import styles from './index.module.scss';

const ProductSize = ({ skuId, value, quantity, selectedSize }) => {
  const { selectSize } = useProduct();
  let addEventHandler = false;
  if (quantity > 0 && value !== selectedSize) {
    addEventHandler = true;
  }

  const handleSelectSize = () => {
    if (value === selectedSize) {
      return;
    }
    selectSize({ skuId, value, quantity });
  };

  let sizeStyles = `
  ${styles.size} 
  ${value === selectedSize && styles.fill} 
  ${quantity <= 0 && styles.no_stock}
  `;

  return (
    <div
      className={sizeStyles}
      onClick={addEventHandler ? handleSelectSize : undefined}
    >
      {value.toUpperCase()}
    </div>
  );
};

export default ProductSize;
