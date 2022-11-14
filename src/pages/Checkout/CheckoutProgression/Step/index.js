import { Link } from 'react-router-dom';

import { FaChevronRight, FaCheck } from 'react-icons/fa';

import styles from './index.module.scss';

const Step = ({ label, url, index, handleSelectStep }) => {
  const handleClick = () => {
    handleSelectStep(index);
  };

  const lastStep = index === 3;

  if (url) {
    return (
      <>
        <Link to={url}>
          <div className={styles.step_wrapper}>
            <span className={styles.label}>{label}</span>
            <div className={styles.item_completed}>
              <FaCheck />
            </div>
          </div>
        </Link>
        {!lastStep && (
          <i className={styles.arrow}>
            <FaChevronRight></FaChevronRight>{' '}
          </i>
        )}
      </>
    );
  }

  return (
    <>
      <div className={styles.step_wrapper} onClick={handleClick}>
        <span className={styles.label}>{label}</span>
        <div className={styles.item}>{index + 1}</div>
        {/* <div className={styles.item_completed}>
          <FaCheck />
        </div> */}
      </div>
      {!lastStep && (
        <i className={styles.arrow}>
          <FaChevronRight></FaChevronRight>{' '}
        </i>
      )}
    </>
  );
};

export default Step;
