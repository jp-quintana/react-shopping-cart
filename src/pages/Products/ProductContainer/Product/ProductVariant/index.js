import styles from './index.module.scss';

const ProductVariant = (props) => {
  const { id, thumbnail, onSelectVariant } = props;

  const selectVariantHandler = () => {
    onSelectVariant(id);
  };

  return (
    <img
      className={styles.thumbnail}
      onClick={selectVariantHandler}
      src={thumbnail}
      alt=""
    />
  );
};

export default ProductVariant;
