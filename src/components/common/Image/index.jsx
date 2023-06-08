import { useState, useRef } from 'react';

import styles from './index.module.scss';

const Image = ({
  src,
  alt,
  clearPlaceholders,
  containerClassName,
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

  return (
    <div className={`${styles.image_container} ${containerClassName}`}>
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
  );
};

export default Image;
