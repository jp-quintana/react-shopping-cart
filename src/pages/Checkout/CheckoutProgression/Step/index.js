import { Link } from 'react-router-dom';

import { FaChevronRight, FaCheck } from 'react-icons/fa';

import styles from './index.module.scss';

const Step = ({ label, url, index, handleSelectStep, currentStep }) => {
  const handleClick = () => {
    handleSelectStep(index);
  };

  const lastStep = index === 3;

  let stepContent;
  let stepStyles;

  if (currentStep === index) {
    stepStyles = styles.item_selected;
    stepContent = <div className={stepStyles}>{index + 1}</div>;
  } else {
    stepStyles = styles.item;
    stepContent = <div className={stepStyles}>{index + 1}</div>;
  }

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
        {stepContent}
        {/* <div className={styles.item}>{index + 1}</div> */}
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
