import { createPortal } from 'react-dom';

import Backdrop from '../Backdrop';
import ImageContainer from '../ImageContainer';

import styles from './index.module.scss';

import LoaderImage from 'assets/images/loader.png';

const Loader = ({
  noPortal,
  backdropClassName,
  wrapperClassName,
  loaderClassName,
}) => {
  // TODO: update this whole component

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
          {/* <img
            className={`${styles.loader} ${loaderClassName}`}
            src={LoaderImage}
            alt=""
          /> */}
          <ImageContainer
            src={LoaderImage}
            alt=""
            containerClassName={styles.image_container}
            fillClassName={styles.image_fill}
            imageClassName={`${styles.image} ${loaderClassName}`}
          />
        </div>,
        overlaysElement
      )}
    </>
  );
};

export default Loader;
