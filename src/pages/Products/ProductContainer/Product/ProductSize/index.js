import styles from './index.module.scss';

const ProductSize = ({ sku, value, stock, selectedSize, onSelectSize }) => {
  let shouldAddEventHandler = false;
  if (stock > 0 && value !== selectedSize) {
    shouldAddEventHandler = true;
  }

  const handleSelectSize = () => {
    onSelectSize({ sku, value });
  };

  let sizeStyles = `
    ${styles.size} 
    ${value === selectedSize && styles.fill} 
    ${stock === 0 && styles.no_stock}
  `;

  return (
    <div
      className={sizeStyles}
      onClick={shouldAddEventHandler ? handleSelectSize : undefined}
    >
      {value}
    </div>
  );
};

export default ProductSize;
