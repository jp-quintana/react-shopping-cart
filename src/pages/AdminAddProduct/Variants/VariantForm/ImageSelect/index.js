import { useState } from 'react';

import styles from './index.module.scss';

const ImageSelect = ({ images }) => {
  const [availableImages, setAvailableImages] = useState(
    images.map((image) => ({
      name: image.name,
    }))
  );
  const [selectedImages, setSelectedImages] = useState([]);
  const [itemBeingDragged, setItemBeingDragged] = useState(null);

  const handleDragStart = (e, id) => {
    setItemBeingDragged(id);
  };

  const handleDragEnd = (e) => {
    setItemBeingDragged(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.target.id === 'selectedImagesList') {
      const updatedSelectedImages = [...selectedImages];
      if (
        updatedSelectedImages.filter(
          (selectedImage) => selectedImage.name === itemBeingDragged
        ).length > 0
      ) {
        return;
      }

      const updatedAvailableImages = availableImages.filter(
        (availableImage) => availableImage.name !== itemBeingDragged
      );

      updatedSelectedImages.push({ name: itemBeingDragged });

      setAvailableImages(updatedAvailableImages);
      setSelectedImages(updatedSelectedImages);
    }

    if (e.target.id === 'availableImagesList') {
      const updatedAvailableImages = [...availableImages];
      if (
        updatedAvailableImages.filter(
          (availableImage) => availableImage.name === itemBeingDragged
        ).length > 0
      ) {
        return;
      }

      const updatedSelectedImages = selectedImages.filter(
        (selectedImage) => selectedImage.name !== itemBeingDragged
      );

      updatedAvailableImages.push({ name: itemBeingDragged });

      setSelectedImages(updatedSelectedImages);
      setAvailableImages(updatedAvailableImages);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.available_images_container}>
        <p className={styles.title}>Available Images:</p>
        <ul
          id="availableImagesList"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={styles.images_list}
        >
          {availableImages.map((availableImage) => (
            <li
              key={availableImage.name}
              onDragStart={(e) => handleDragStart(e, availableImage.name)}
              onDragEnd={handleDragEnd}
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
              <p className={styles.image}>{selectedImage.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageSelect;
