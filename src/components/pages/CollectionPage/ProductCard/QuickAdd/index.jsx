import { FaPlus } from 'react-icons/fa';

import styles from './index.module.scss';

const QuickAdd = ({
  availableQuantity,
  sizes,
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
          {sizes.map((size) => (
            <div key={size} className={styles.size}>
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAdd;
