import styles from './index.module.scss';

const ProductSize = (props) => {
  const { value, stock, size, onSelectSize } = props;

  const onSelectHandler = () => {
    if (stock > 0) {
      onSelectSize(value);
    }
  };

  let sizeStyles = `
    ${styles.size} 
    ${value === size && styles.fill} 
    ${stock === 0 && styles.no_stock}
  `;

  return (
    <div className={sizeStyles} onClick={onSelectHandler}>
      {value}
    </div>
  );
};

export default ProductSize;
