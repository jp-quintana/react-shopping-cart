import { useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const MediaContainer = ({
  image,
  video,
  autoPlay,
  loop,
  muted,
  to,
  alt,
  onClick,
  clearPlaceholders,
  containerClassName,
  fillClassName,
  placeholderClassName,
  mediaClassName,
}) => {
  const placeholdersCleared = useRef(false);

  const [mediaIsLoading, setMediaIsLoading] = useState(true);
  const [showMediaPlaceHolder, setShowMediaPlaceholder] = useState(true);

  const clearMediaPlaceholder = () => {
    if (clearPlaceholders && !placeholdersCleared.current) {
      placeholdersCleared.current = true;
      clearPlaceholders();
    }
    setShowMediaPlaceholder(false);
    setTimeout(() => {
      return setMediaIsLoading(false);
    }, 100);
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.media_container} ${containerClassName}`}
      >
        <div className={`${styles.media_fill} ${fillClassName}`}>
          {mediaIsLoading && (
            <div
              className={`${styles.media_placeholder} ${placeholderClassName} ${
                showMediaPlaceHolder ? undefined : styles.hide
              }`}
            />
          )}
          {image && (
            <img
              src={image}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              onLoad={clearMediaPlaceholder}
              alt={alt}
              className={`${styles.image} ${mediaClassName} ${
                !mediaIsLoading ? styles.show : undefined
              }`}
            />
          )}
          {video && (
            <video
              src={video}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              onLoadedData={clearMediaPlaceholder}
              className={`${styles.video} ${mediaClassName} ${
                !mediaIsLoading ? styles.show : undefined
              }`}
            />
          )}
        </div>
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${styles.media_container} ${containerClassName}`}
    >
      <div className={`${styles.media_fill} ${fillClassName}`}>
        {mediaIsLoading && (
          <div
            className={`${styles.media_placeholder} ${placeholderClassName} ${
              showMediaPlaceHolder ? undefined : styles.hide
            }`}
          />
        )}
        {image && (
          <img
            src={image}
            onLoad={clearMediaPlaceholder}
            alt={alt}
            className={`${styles.image} ${mediaClassName} ${
              !mediaIsLoading ? styles.show : undefined
            }`}
            loading="lazy"
          />
        )}
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            onLoadedData={clearMediaPlaceholder}
            className={`${styles.video} ${mediaClassName} ${
              !mediaIsLoading ? styles.show : undefined
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default MediaContainer;
