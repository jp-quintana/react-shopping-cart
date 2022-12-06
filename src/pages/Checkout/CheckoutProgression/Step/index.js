import { Link } from 'react-router-dom';

import { FaChevronRight, FaCheck } from 'react-icons/fa';

import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import styles from './index.module.scss';

const Step = ({ label, url, index }) => {
  const { currentStep } = useCheckoutContext();
  const { selectStep } = useCheckout();

  const handleClick = () => {
    selectStep(index);
  };

  const lastStep = index === 3;

  let stepContent;
  let stepStyles;

  if (url) {
    stepStyles = styles.item_completed;
    stepContent = (
      <Link to={url}>
        <div className={styles.step_wrapper}>
          <span className={styles.label}>{label}</span>
          <div className={styles.item_completed}>
            <FaCheck />
          </div>
        </div>
      </Link>
    );
  } else if (currentStep === index) {
    stepStyles = styles.item_selected;
    stepContent = (
      <div className={styles.step_wrapper}>
        <span className={styles.label}>{label}</span>
        <div className={stepStyles}>{index + 1}</div>
      </div>
    );
  } else if (currentStep > index) {
    stepStyles = styles.item_completed;
    stepContent = (
      <div onClick={handleClick} className={styles.step_wrapper}>
        <span className={styles.label}>{label}</span>
        <div className={stepStyles}>
          <FaCheck className={styles.checkmark} />
        </div>
      </div>
    );
  } else {
    stepStyles = styles.item;
    stepContent = (
      <div className={styles.step_wrapper}>
        <span className={styles.label}>{label}</span>
        <div className={stepStyles}>{index + 1}</div>
      </div>
    );
  }

  return (
    <>
      {stepContent}
      {!lastStep && (
        <i className={styles.arrow}>
          <FaChevronRight />{' '}
        </i>
      )}
    </>
  );
};

export default Step;
