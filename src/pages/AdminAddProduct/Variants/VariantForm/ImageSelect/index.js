import { useState } from 'react';

import styles from './index.module.scss';

const ImageSelect = ({ images }) => {
  const [availableImages, setAvailableImages] = useState();

  const [selectedImages, setSelectedImages] = useState();

  return (
    <div className={styles.container}>
      <div className={styles.available_images_container}>
        <p className={styles.title}>Available Images:</p>
        <ul className={styles.images_list}>
          <li>
            <p className={styles.image}>Prueba 1</p>
          </li>
          <li>
            <p className={styles.image}>Prueba 2</p>
          </li>
          <li>
            <p className={styles.image}>Prueba 3</p>
          </li>
        </ul>
      </div>
      <div className={styles.selected_images_container}>
        <p className={styles.title}>Selected Images:</p>
        <ul className={styles.images_list}></ul>
      </div>
    </div>
  );
};

export default ImageSelect;
