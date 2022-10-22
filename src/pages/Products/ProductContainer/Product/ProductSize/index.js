import styles from './index.module.scss';

const ProductSize = ({
  sku,
  value,
  stock,
  selectedSize,
  onSelectSize,
  dispatchProductAction,
}) => {
  let addEventHandler = false;
  if (stock > 0 && value !== selectedSize) {
    addEventHandler = true;
  }

  const handleSelectSize = () => {
    if (value === selectedSize) {
      console.log('working');
      return;
    }
    dispatchProductAction({
      type: 'SELECT_PRODUCT_SIZE',
      payload: { sku, value, stock },
    });
  };

  let sizeStyles = `
    ${styles.size} 
    ${value === selectedSize && styles.fill} 
    ${stock === 0 && styles.no_stock}
  `;

  return (
    <div
      className={sizeStyles}
      onClick={addEventHandler ? handleSelectSize : undefined}
    >
      {value}
    </div>
  );
};

export default ProductSize;
