import styles from './index.module.scss';

const Backdrop = ({ toggleModal }) => {
  return <div className={styles.backdrop} onClick={toggleModal}></div>;
};

export default Backdrop;
