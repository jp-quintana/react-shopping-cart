import { useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const ImageContainer = ({
  src,
  to,
  alt,
  onClick,
  clearPlaceholders,
  containerClassName,
  fillClassName,
  placeholderClassName,
  imageClassName,
}) => {
  const placeholdersCleared = useRef(false);

  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [showImagePlaceholder, setImageShowPlaceholder] = useState(true);

  const clearImagePlaceholder = () => {
    if (clearPlaceholders && !placeholdersCleared.current) {
      placeholdersCleared.current = true;
      clearPlaceholders();
    }

    setImageShowPlaceholder(false);
    setTimeout(() => {
      return setImageIsLoading(false);
    }, 100);
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.image_container} ${containerClassName}`}
      >
        <div className={`${styles.image_fill} ${fillClassName}`}>
          {imageIsLoading && (
            <div
              className={`${styles.image_placeholder} ${placeholderClassName} ${
                showImagePlaceholder ? undefined : styles.hide
              }`}
            />
          )}
          <img
            src={src}
            onLoad={clearImagePlaceholder}
            alt={alt}
            className={`${styles.image} ${imageClassName} ${
              !imageIsLoading ? styles.show : undefined
            }`}
          ></img>
        </div>
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${styles.image_container} ${containerClassName}`}
    >
      <div className={`${styles.image_fill} ${fillClassName}`}>
        {imageIsLoading && (
          <div
            className={`${styles.image_placeholder} ${placeholderClassName} ${
              showImagePlaceholder ? undefined : styles.hide
            }`}
          />
        )}
        <img
          src={src}
          onLoad={clearImagePlaceholder}
          alt={alt}
          className={`${styles.image} ${imageClassName} ${
            !imageIsLoading ? styles.show : undefined
          }`}
        ></img>
      </div>
    </div>
  );
};

export default ImageContainer;
