import { useState } from 'react';

import ProductForm from './ProductForm';
import VariantsForm from './VariantsForm';

import styles from './index.module.scss';

const AdminAddProduct = () => {
  const [images, setImages] = useState([]);

  const [productInput, setProductInput] = useState({
    model: '',
    type: '',
    collection: '',
    description: '',
    tags: '',
    sku: '',
  });

  const [tags, setTags] = useState([]);

  const [variants, setVariants] = useState(0);

  const [sizes, setSizes] = useState({
    options: { s: false, m: false, l: false, xl: false, xxl: false },
    selected: [],
  });

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

  const handleModelInput = (e) => {
    setProductInput((prevState) => ({ ...prevState, model: e.target.value }));
  };

  const handleTypeInput = (e) => {
    setProductInput((prevState) => ({ ...prevState, type: e.target.value }));
  };

  const handleCollectionInput = (e) => {
    setProductInput((prevState) => ({
      ...prevState,
      collection: e.target.value,
    }));
  };

  const handleDescriptionInput = (e) => {
    setProductInput((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const handleTagsInput = (e) => {
    setProductInput((prevState) => ({ ...prevState, tags: e.target.value }));

    if (e.key === 'Enter') {
      const checkForExistingTag = tags.find(
        (tag) => tag.content === e.target.value
      );

      if (checkForExistingTag) {
        return;
      }

      const updatedTags = tags;
      updatedTags.push({ content: e.target.value.toLowerCase() });
      setTags(updatedTags);
      setProductInput((prevState) => ({ ...prevState, tags: '' }));
    }
  };

  const handleDeleteTags = (tagContent) => {
    const updatedTags = tags.filter((tag) => tag.content !== tagContent);
    setTags(updatedTags);
  };

  const handleSkuInput = (e) => {
    setProductInput((prevState) => ({
      ...prevState,
      sku: e.target.value,
    }));
  };

  const handleVariantsInput = (e) => {
    setVariants(+e.target.value);
  };

  const handleSizesInput = (e) => {
    const updatedSizes = { ...sizes };
    updatedSizes.options[e.target.value] = e.target.checked;

    updatedSizes.selected = Object.keys(updatedSizes.options).filter(
      (key) => updatedSizes.options[key]
    );

    setSizes(updatedSizes);
  };

  return (
    <section>
      <div className={`${styles.container} main-container`}>
        <h1>Add Product</h1>
        <ProductForm
          images={images}
          productInput={productInput}
          tags={tags}
          variants={variants}
          handleImagesInput={handleImagesInput}
          handleDeleteImage={handleDeleteImage}
          handleModelInput={handleModelInput}
          handleTypeInput={handleTypeInput}
          handleCollectionInput={handleCollectionInput}
          handleDescriptionInput={handleDescriptionInput}
          handleTagsInput={handleTagsInput}
          handleDeleteTags={handleDeleteTags}
          handleSkuInput={handleSkuInput}
          handleVariantsInput={handleVariantsInput}
          handleSizesInput={handleSizesInput}
        />
        <VariantsForm
          variants={variants}
          sizes={sizes.selected}
          baseSku={productInput.sku}
          images={images}
        />
      </div>
    </section>
  );
};

export default AdminAddProduct;
