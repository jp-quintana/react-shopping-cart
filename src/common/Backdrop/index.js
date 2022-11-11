import styles from './index.module.scss';

const Backdrop = ({ toggleModal }) => {
  const handleClick = () => {
    if (toggleModal) {
      toggleModal();
    }
  };

  return <div className={styles.backdrop} onClick={handleClick}></div>;
};

export default Backdrop;
