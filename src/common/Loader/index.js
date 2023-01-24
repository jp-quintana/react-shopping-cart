import { createPortal } from 'react-dom';

import Backdrop from 'common/Backdrop';

import styles from './index.module.scss';

import LoaderImage from 'assets/images/loader.png';

const Loader = ({
  className,
  noPortal,
  backdropClassName,
  wrapperClassName,
  loaderClassName,
}) => {
  const backdropElement = document.getElementById('backdrop');
  const overlaysElement = document.getElementById('overlays');

  if (noPortal) {
    return (
      <>
        <div className={`${className} ${styles.loader_wrapper}`}>
          <img className={styles.loader} src={LoaderImage} alt="" />
        </div>
      </>
    );
  }

  return (
    <>
      {createPortal(
        <Backdrop className={backdropClassName} />,
        backdropElement
      )}
      {createPortal(
        <div className={`${styles.loader_wrapper} ${wrapperClassName}`}>
          <img className={styles.loader} src={LoaderImage} alt="" />
        </div>,
        overlaysElement
      )}
    </>
  );
};

export default Loader;
