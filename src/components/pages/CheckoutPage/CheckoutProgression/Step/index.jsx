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

  if (url) {
    stepContent = (
      <Link to={url}>
        <div className={styles.step_wrapper}>
          <span className={styles.label_completed}>{label}</span>
          <div className={styles.item_completed}>
            <FaCheck />
          </div>
        </div>
      </Link>
    );
  } else if (currentStep === index) {
    stepContent = (
      <div className={styles.step_wrapper}>
        <span className={styles.label_selected}>{label}</span>
        <div className={styles.item_selected}>{index + 1}</div>
      </div>
    );
  } else if (currentStep > index) {
    stepContent = (
      <div onClick={handleClick} className={styles.step_wrapper}>
        <span className={styles.label_completed}>{label}</span>
        <div className={styles.item_completed}>
          <FaCheck className={styles.checkmark} />
        </div>
      </div>
    );
  } else {
    stepContent = (
      <div className={styles.step_wrapper}>
        <span className={styles.label}>{label}</span>
        <div className={styles.item}>{index + 1}</div>
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
