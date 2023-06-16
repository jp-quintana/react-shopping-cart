import { createPortal } from 'react-dom';

import Backdrop from '../Backdrop';
import ImageContainer from '../ImageContainer';

import styles from './index.module.scss';

import LoaderImage from 'assets/images/loader.png';

const Loader = ({
  noPortal,
  backdropClassName,
  containerClassName,
  loaderClassName,
}) => {
  // TODO: update this whole component

  const overlayElement = document.getElementById('overlay');

  if (noPortal) {
    return (
      <>
        <div className={`${styles.loader_np_container} ${containerClassName}`}>
          <ImageContainer
            src={LoaderImage}
            alt=""
            containerClassName={styles.image_container}
            fillClassName={styles.image_fill}
            imageClassName={`${styles.image} ${loaderClassName}`}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {createPortal(
        <>
          <Backdrop
            backdropClassName={`${styles.backdrop} ${backdropClassName}`}
          />
          <div className={`${styles.loader_container} ${containerClassName}`}>
            <ImageContainer
              src={LoaderImage}
              alt=""
              containerClassName={styles.image_container}
              fillClassName={styles.image_fill}
              imageClassName={`${styles.image} ${loaderClassName}`}
            />
          </div>
        </>,
        overlayElement
      )}
    </>
  );
};

export default Loader;
