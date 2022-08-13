import styles from './index.module.scss';

const ProductSize = (props) => {
  const { value, stock, size, onSelectSize } = props;

  let shouldAddEventHandler = false;
  if (stock > 0 && value !== size) {
    shouldAddEventHandler = true;
  }

  const handleSelectSize = () => {
    onSelectSize(value);
  };

  let sizeStyles = `
    ${styles.size} 
    ${value === size && styles.fill} 
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
