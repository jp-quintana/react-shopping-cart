import { useState } from 'react';

import styles from './index.module.scss';

const ImageSelect = ({ images }) => {
  const [availableImages, setAvailableImages] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);
  const [itemBeingDragged, setItemBeingDragged] = useState(null);

  const handleDragStart = (e) => {
    console.log(e.target);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.fromData);
    // if (e.target.id === 'selectedImagesList') {
    //   const updatedAvailableImages = availableImages.filter(
    //     (availableImage) => availableImage.name !== e.target.value
    //   );
    //   const updatedSelectedImages = [...selectedImages];

    //   console.log(e.dataTransfer);

    //   // updatedSelectedImages.push(e.dataTransfer.files[0]);

    //   // setSelectedImages(updatedSelectedImages);
    // }
  };

  console.log(availableImages);
  return (
    <div className={styles.container}>
      <div className={styles.available_images_container}>
        <p className={styles.title}>Available Images:</p>
        <ul onDragOver={handleDragOver} className={styles.images_list}>
          {availableImages.map((availableImage) => (
            <li
              key={availableImage.name}
              onDragStart={handleDragStart}
              draggable
            >
              <p className={styles.image}>{availableImage.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.selected_images_container}>
        <p className={styles.title}>Selected Images:</p>
        <ul
          id="selectedImagesList"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={styles.images_list}
        >
          {selectedImages.map((selectedImage) => (
            <li key={selectedImage.name} draggable>
              {console.log(selectedImage)}
              <p className={styles.image}>{selectedImage.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageSelect;
