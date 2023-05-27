import { useKeyDown } from 'hooks/useKeyDown';

import Button from 'components/Button';

import styles from './index.module.scss';

const ConfirmMessage = ({ text, handleConfirm, handleCancel }) => {
  useKeyDown(() => {
    handleCancel();
  }, ['Escape']);
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      <div className={styles.controls_wrapper}>
        <Button onClick={handleConfirm} type="button">
          Confirm
        </Button>
        <Button onClick={handleCancel} type="button">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ConfirmMessage;
