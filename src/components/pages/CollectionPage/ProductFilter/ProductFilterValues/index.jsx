import { FaRedoAlt, FaTimes } from 'react-icons/fa';

import styles from './index.module.scss';

const ProductFilterValues = ({ filterConditions, handleClearConditions }) => {
  return (
    <div className={styles.container}>
      <div onClick={handleClearConditions} className={styles.clear_all}>
        <span>Clear all</span>
        <FaRedoAlt />
      </div>
      {Object.entries(filterConditions).map(([property, conditions]) => (
        <div className={styles.group} key={property}>
          {conditions.map((condition) => (
            <div key={condition} className={styles.condition}>
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
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductFilterValues;
