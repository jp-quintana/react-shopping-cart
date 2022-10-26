import styles from './index.module.scss';

const Backdrop = ({ toggleCartModal }) => {
  return <div className={styles.backdrop} onClick={toggleCartModal}></div>;
};

export default Backdrop;
