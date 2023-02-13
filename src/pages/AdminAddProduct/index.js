import { useState } from 'react';

import DragDropFiles from 'components/DragDropFiles';

import styles from './index.module.scss';

const AdminAddProduct = () => {
  const [images, setImages] = useState([]);
  const [productInput, setProductInput] = useState({
    model: '',
    type: '',
    collection: '',
    description: '',
    tags: [],
  });
  const [variants, setVariants] = useState(0);
  const [sizes, setSizes] = useState([]);

  const handleImagesInput = (e) => {
    let inputFiles;

    e.dataTransfer
      ? (inputFiles = e.dataTransfer.files)
      : (inputFiles = e.target.files);

    if (inputFiles.length > 0) {
      const updatedFileList = [...images];

      for (let i = 0; i < inputFiles.length; i++) {
        const isImage = !!inputFiles[i].type.match(`image.*`);

        if (isImage) {
          const checkForExistingImage = images.find(
            (image) => image.name === inputFiles[i].name
          );

          if (!checkForExistingImage) {
            updatedFileList.push(inputFiles[i]);
          }
        }
      }

      setImages(updatedFileList);
    }
  };

  const handleDeleteImage = (fileName) => {
    const updatedImages = images.filter((image) => image.name !== fileName);

    setImages(updatedImages);
  };

  const handleModelInput = (e) => {};
  const handleTypeInput = (e) => {};
  const handleCollectionInput = (e) => {};
  const handleDescriptionInput = (e) => {};
  const handleTagsInput = (e) => {};
  const handleVariantsInput = (e) => {};
  const handleSizesInput = (e) => {};

  // TODO: CREAR TAG INPUT COMPONENT
  return (
    <section>
      <div className={`${styles.container} main-container`}>
        <h1>Add Product</h1>
        <div className={styles.form_wrapper}>
          <form className={styles.form}>
            <div className={styles.images_wrapper}>
              <label htmlFor="file" className={styles.label}>
                <span>All images:</span>
              </label>
              <DragDropFiles
                id="file"
                title="images"
                type="image"
                files={images}
                handleImagesInput={handleImagesInput}
                handleDeleteImage={handleDeleteImage}
                className={styles.dropzone_wrapper}
              />
            </div>
            <label className={styles.label}>
              <span>Model:</span>
              <input type="text" required />
            </label>
            <label className={styles.label}>
              <span>Type:</span>
              <input type="text" required />
            </label>
            <label className={styles.label}>
              <span>Collection:</span>
              <select defaultValue="default" required>
                <option value="default" disabled>
                  Select your option
                </option>
                <option value="remeras">remeras</option>
                <option value="buzos">buzos</option>
                <option value="accesorios">accesorios</option>
              </select>
            </label>
            <label className={styles.label}>
              <span>Description:</span>
              <textarea type="text" required />
            </label>
            <label className={styles.label}>
              <span>Tags:</span>
              <input type="text" required />
            </label>
            <label className={styles.label}>
              <span>Variants:</span>
              <select defaultValue="default" required>
                <option value="default" disabled>
                  Select your option
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </label>
            <fieldset>
              <legend>Sizes:</legend>
              <div className={styles.checkbox_wrapper}>
                <label>
                  <input type="checkbox" value="S" />
                  <span>S</span>
                </label>
                <label>
                  <input type="checkbox" value="M" />
                  <span>M</span>
                </label>
                <label>
                  <input type="checkbox" value="L" />
                  <span>L</span>
                </label>
                <label>
                  <input type="checkbox" value="XL" />
                  <span>XL</span>
                </label>
                <label>
                  <input type="checkbox" value="XXL" />
                  <span>XXL</span>
                </label>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminAddProduct;
