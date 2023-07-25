import { FaPlus } from 'react-icons/fa';

const QuickAdd = ({
  containerClassName,
  topContainerClassName,
  bottomContainerClassName,
}) => {
  return (
    <div className={containerClassName}>
      <div className={topContainerClassName}>
        <p>Quick Add</p>
        <span>
          <FaPlus />
        </span>
      </div>
    </div>
  );
};

export default QuickAdd;
