import { FaPlus } from 'react-icons/fa';

import styles from './index.module.scss';

const QuickAdd = ({
  skus,
  handleAddItem,
  isLoading,
  containerClassName,
  wrapperClassName,
  topContainerClassName,
  bottomContainerClassName,
}) => {
  return (
    <div className={containerClassName}>
      <div className={wrapperClassName}>
        <div className={topContainerClassName}>
          <p>Quick Add</p>
          <span>
            <FaPlus />
          </span>
        </div>
        <div className={bottomContainerClassName}>
          {skus.length > 1 ? (
            <div
              className={`${styles.sizes_wrapper} ${
                isLoading ? styles.center : undefined
              }`}
            >
              {skus.map((sku) => (
                <div
                  key={sku.skuId}
                  onClick={
                    !isLoading && sku.quantity > 0
                      ? () =>
                          handleAddItem({ skuId: sku.skuId, size: sku.size })
                      : undefined
                  }
                  className={`
                    ${
                      sku.quantity > 0 ? styles.size : styles.size_no_quantity
                    } ${isLoading && styles.no_show}`}
                >
                  {sku.size}
                </div>
              ))}
              {isLoading && <div className={styles.loader}></div>}
            </div>
          ) : (
            <div className={styles.single_size_wrapper}>
              {skus.map((singleSku) => (
                <div
                  key={singleSku.skuId}
                  onClick={
                    !isLoading && singleSku.quantity > 0
                      ? () =>
                          handleAddItem({
                            skuId: singleSku.skuId,
                            size: singleSku.size,
                          })
                      : undefined
                  }
                  className={`${
                    singleSku.quantity > 0
                      ? styles.single_size
                      : styles.single_size_no_quantity
                  } ${isLoading && styles.no_show}`}
                >
                  Add To Bag
                </div>
              ))}
              {isLoading && <div className={styles.loader}></div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickAdd;
