import styles from './index.module.scss';

const ProductSize = (props) => {
  const { value, stock, selectedSize, onSelectSize } = props;

  let shouldAddEventHandler = false;
  if (stock > 0 && value !== selectedSize) {
    shouldAddEventHandler = true;
  }

  const handleSelectSize = () => {
    onSelectSize(value);
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
