import { createPortal } from 'react-dom';

import Backdrop from 'components/common/Backdrop';
import ImageContainer from 'components/common/ImageContainer';

import styles from './index.module.scss';

import LoaderImage from 'assets/images/loader.png';

const Loader = ({
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
        <div className={`${styles.loader_wrapper} ${wrapperClassName}`}>
          <img
            className={`${styles.loader} ${loaderClassName}`}
            src={LoaderImage}
            alt=""
          />
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
          <img
            className={`${styles.loader} ${loaderClassName}`}
            src={LoaderImage}
            alt=""
          />
        </div>,
        overlaysElement
      )}
    </>
  );
};

export default Loader;
