import { useState, useRef, useEffect } from 'react';

import { FaTimesCircle, FaPlusCircle } from 'react-icons/fa';

import styles from './index.module.scss';

const ImageSelect = ({ images }) => {
  const [availableImages, setAvailableImages] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const startDragIndex = useRef();
  const currentDragIndex = useRef();

  const handleDrop = () => {
    let updatedImages = [...selectedImages];

    const dragItemContent = updatedImages.splice(startDragIndex.current, 1)[0];

    updatedImages.splice(currentDragIndex.current, 0, dragItemContent);

    startDragIndex.current = null;
    currentDragIndex.current = null;

    setSelectedImages(updatedImages);
  };

  const handleAdd = (image) => {
    const updatedAvailableImages = availableImages.filter(
      (availableImage) => availableImage !== image
    );

    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.push(image);

    setSelectedImages(updatedSelectedImages);
    setAvailableImages(updatedAvailableImages);
  };

  const handleDelete = (image) => {
    const updatedSelectedImages = selectedImages.filter(
      (selectedImage) => selectedImage !== image
    );

    const updatedAvailableImages = [...availableImages];
    updatedAvailableImages.push(image);

    setSelectedImages(updatedSelectedImages);
    setAvailableImages(updatedAvailableImages);
  };

  useEffect(() => {
    const allImages = images.map((image) => image.name);

    const availableImages = allImages.filter(
      (image) => !selectedImages.includes(image)
    );

    setAvailableImages(availableImages);
  }, []);

  return (
    <div className={styles.container}>
      {availableImages && (
        <>
          <div className={styles.available_images_container}>
            <p className={styles.title}>Available Images:</p>
            <ul className={styles.images_list}>
              {availableImages.map((availableImage) => (
                <li
                  key={availableImage}
                  onClick={() => handleAdd(availableImage)}
                >
                  <p className={styles.image}>{availableImage}</p>
                  <i>
                    <FaPlusCircle />
                  </i>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.selected_images_container}>
            <p className={styles.title}>Selected Images:</p>
            <ul
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={styles.images_list}
            >
              {selectedImages.map((selectedImage, index) => (
                <li
                  key={selectedImage}
                  onDragStart={() => (startDragIndex.current = index)}
                  onDragEnter={() => (currentDragIndex.current = index)}
                  draggable
                >
                  <p className={styles.image}>{selectedImage}</p>
                  <i>
                    <FaTimesCircle
                      onClick={() => handleDelete(selectedImage)}
                    />
                  </i>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSelect;
