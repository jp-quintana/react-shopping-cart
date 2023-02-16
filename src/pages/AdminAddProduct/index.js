import { useState, useEffect } from 'react';

import { v4 as uuid } from 'uuid';

import ProductForm from './ProductForm';
import Variants from './Variants';

import Button from 'components/Button';

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
    variants: 0,
    sizes: { s: false, m: false, l: false, xl: false, xxl: false },
  });

  const [tags, setTags] = useState([]);

  const [variants, setVariants] = useState([]);

  const [sizes, setSizes] = useState([]);

  const [isEditingVariant, setIsEditingVariant] = useState(-1);
  const [isEditingOtherVariant, setIsEditingOtherVariant] = useState(false);

  useEffect(() => {
    if (isEditingVariant > -1) {
      setIsEditingOtherVariant(true);
    } else {
      setIsEditingOtherVariant(false);
    }
  }, [isEditingVariant]);

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
    const updatedVariants = variants;
    const numberOfVariants = +e.target.value;
    for (let i = 0; i < numberOfVariants; i++) {
      if (!updatedVariants[i]) {
        updatedVariants.push({
          id: uuid(),
          color: '',
          isAltColor: false,
          price: '',
          inventory: { s: '', m: '', l: '', xl: '', xxl: '' },
        });
      }
    }

    setVariants(updatedVariants.slice(0, numberOfVariants));
    setProductInput((prevState) => ({
      ...prevState,
      variants: numberOfVariants,
    }));
  };

  const handleSizesInput = (e) => {
    const updatedSizesInput = { ...productInput.sizes };

    updatedSizesInput[e.target.value] = e.target.checked;

    const updatedSizes = Object.keys(updatedSizesInput).filter(
      (key) => updatedSizesInput[key]
    );

    setSizes(updatedSizes);
    setProductInput((prevState) => ({
      ...prevState,
      sizes: updatedSizesInput,
    }));
  };

  const handleEditVariant = (index) => {
    setIsEditingVariant(index);
  };

  const handleVariantEditSubmit = ({ variantIndex, ...updatedVariant }) => {
    const updatedVariants = [...variants];

    console.log('aca', updatedVariant);
    updatedVariants[variantIndex] = updatedVariant;

    setVariants(updatedVariants);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        <div className={`${styles.container} main-container`}>
          <h1>Add Product</h1>
          <ProductForm
            productInput={productInput}
            images={images}
            tags={tags}
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
            handleProductSubmit={handleProductSubmit}
          />
          {!!productInput.variants && (
            <Variants
              variants={variants}
              sizes={sizes}
              images={images}
              isEditingVariant={isEditingVariant}
              isEditingOtherVariant={isEditingOtherVariant}
              handleEditVariant={handleEditVariant}
              handleVariantEditSubmit={handleVariantEditSubmit}
            />
          )}
          <div className={styles.button_wrapper}>
            <Button type="submit" form="product-form">
              Create
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminAddProduct;
