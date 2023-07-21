import { FaRedoAlt, FaTimes } from 'react-icons/fa';

import styles from './index.module.scss';

const ProductFilterValues = ({
  filterConditions,
  handleClearConditions,
  handleCommonButton,
  handleResetPriceRange,
  containerClassName,
}) => {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <div onClick={handleClearConditions} className={styles.clear_all}>
        <span>Clear all</span>
        <FaRedoAlt />
      </div>
      {Object.entries(filterConditions).map(([property, conditions]) => (
        <div className={styles.group} key={property}>
          {property === 'price' ? (
            <div onClick={handleResetPriceRange} className={styles.condition}>
              {`$${conditions[0]} - $${conditions[1]}`}
              <div className={styles.remove}>
                <FaTimes />
              </div>
            </div>
          ) : (
            conditions.map((condition) => (
              <div
                onClick={() => handleCommonButton(property, condition)}
                key={condition}
                className={styles.condition}
              >
                {property === 'color' && (
                  <div
                    className={styles.color}
                    style={{
                      height: '10px',
                      width: '10px',
                      backgroundColor: condition,
                    }}
                  />
                )}
                {property === 'discount' ? `-${condition}%` : condition}
                <div className={styles.remove}>
                  <FaTimes />
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductFilterValues;
