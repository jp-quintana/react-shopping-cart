import Button from '../Button';

import styles from './index.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.text}>404</p>
        <Button to="/" className={styles.button}>
          Lost? Lets get you back to shopping
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
