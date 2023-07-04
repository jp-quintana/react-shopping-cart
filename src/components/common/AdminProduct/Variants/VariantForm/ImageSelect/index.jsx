import { useState, useRef, useEffect } from 'react';

import { FaTimesCircle, FaPlusCircle } from 'react-icons/fa';

import { useKeyDown } from 'hooks/useKeyDown';

import { Button } from 'components/common';

import styles from './index.module.scss';

const ImageSelect = ({
  images,
  currentlySelectedImages,
  handleImageConfirm,
  closeImageSelector,
}) => {
  useKeyDown(() => {
    closeImageSelector();
  }, ['Escape']);

  const [availableImages, setAvailableImages] = useState(null);
  const [selectedImages, setSelectedImages] = useState(null);
  const [isDraggable, setIsDraggable] = useState(false);

  const startDragIndex = useRef();
  const currentDragIndex = useRef();

  const handleDragDrop = (e) => {
    if (!isDraggable) {
      return;
    }

    let updatedImages = [...selectedImages];

    const dragItemContent = updatedImages.splice(startDragIndex.current, 1)[0];

    updatedImages.splice(currentDragIndex.current, 0, dragItemContent);

    startDragIndex.current = null;
    currentDragIndex.current = null;

    setSelectedImages(updatedImages);
  };

  const handleDragStart = (e, index) => {
    startDragIndex.current = index;
    setIsDraggable(true);
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
    const selectedImages = currentlySelectedImages.map((image) => image.name);

    const availableImages = allImages.filter(
      (image) => !selectedImages.includes(image)
    );

    setAvailableImages(availableImages);
    setSelectedImages(selectedImages);
  }, []);

  const handleConfirm = () => {
    handleImageConfirm(selectedImages);
    closeImageSelector();
  };

  return (
    <div className={styles.container}>
      {availableImages && (
        <>
          <div className={styles.selector_wrapper}>
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
                onDrop={handleDragDrop}
                className={styles.images_list}
              >
                {selectedImages.map((selectedImage, index) => (
                  <li
                    key={selectedImage}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={() => (currentDragIndex.current = index)}
                    onDragEnd={() => setIsDraggable(false)}
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
          </div>
          <div className={styles.button_wrapper}>
            <Button
              type="button"
              onClick={handleConfirm}
              // onClick={selectedImages.length > 0 ? handleConfirm : undefined}
              // disabled={selectedImages.length === 0}
            >
              Confirm
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSelect;
