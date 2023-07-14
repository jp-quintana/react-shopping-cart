import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import { useAdmin } from 'hooks/useAdmin';

import ProductForm from './ProductForm';
import Variants from './Variants';

import { Button, Loader, CenterModal, ConfirmModal } from 'components/common';

import styles from './index.module.scss';

const AdminProduct = ({
  isEditPage,
  currentInventoryLevels,
  productId,
  productImages,
  productModel,
  productType,
  productCollection,
  productDescription,
  productBaseSku,
  productSizesInput,
  productTags,
  productVariants,
  productSizes,
}) => {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState(false);

  const {
    uploadFiles,
    deleteFile,
    createProduct,
    editProduct,
    deleteProduct,
    isLoading,
    error,
  } = useAdmin();

  const [images, setImages] = useState(productImages || []);

  const [productInput, setProductInput] = useState({
    model: productModel || '',
    type: productType || '',
    collection: productCollection || '',
    description: productDescription || '',
    tags: '',
    sku: productBaseSku || '',
    sizes: productSizesInput || {
      s: false,
      m: false,
      l: false,
      xl: false,
      xxl: false,
    },
  });

  const [tags, setTags] = useState(productTags || []);

  const [variants, setVariants] = useState(productVariants || []);

  const [sizes, setSizes] = useState(productSizes || []);

  const [isEditingVariants, setIsEditingVariants] = useState(false);
  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    if (editCount === 0) {
      setIsEditingVariants(false);
    } else {
      setIsEditingVariants(true);
    }
  }, [editCount]);

  const [imagesMarkedForRemoval, setImagesMarkedForRemoval] = useState([]);

  const handleImagesInput = async (e) => {
    let inputFiles;

    e.dataTransfer
      ? (inputFiles = e.dataTransfer.files)
      : (inputFiles = e.target.files);

    if (inputFiles.length > 0) {
      const updatedImages = await uploadFiles('product-images', {
        currentFiles: [...images],
        newFiles: [...inputFiles],
      });

      setImages(updatedImages);
    }
  };

  const handleDeleteImage = (fileName) => {
    const updatedImages = images.filter((image) => image.name !== fileName);
    const imageMarkedForRemoval = images.find(
      (image) => image.name === fileName
    );

    if (!isEditPage) {
      deleteFile('product-images', imageMarkedForRemoval);
    } else {
      const updatedImagesMarkedForRemoval = [...imagesMarkedForRemoval];
      updatedImagesMarkedForRemoval.push(imageMarkedForRemoval);
      setImagesMarkedForRemoval(updatedImagesMarkedForRemoval);
    }

    const updatedVariants = [...variants];

    for (const variant of updatedVariants) {
      variant.images = variant.images.filter((image) => image !== fileName);
    }

    setImages(updatedImages);
    setVariants(updatedVariants);
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

    if (e.key === ',') {
      const checkForExistingTag = tags.find(
        (tag) => tag.content === e.target.value
      );

      if (checkForExistingTag) {
        return;
      }

      const updatedTags = tags;
      updatedTags.push({ content: e.target.value.split(',')[0].toLowerCase() });
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

  const handleAddVariant = () => {
    const updatedVariants = [...variants];

    updatedVariants.push({
      id: uuid(),
      color: '',
      colorDisplay: '',
      currentPrice: 0,
      actualPrice: 0,
      images: [],
      inventory: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
    });

    setVariants(updatedVariants);
  };

  const handleEditVariantCount = (num) => {
    setEditCount((prevState) => prevState + num);
  };

  const handleDeleteVariant = (index) => {
    const updatedVariants = [...variants];

    updatedVariants.splice(index, 1);

    setVariants(updatedVariants);
  };

  const handleVariantEditSubmit = ({ variantIndex, ...updatedVariant }) => {
    const updatedVariants = [...variants];

    updatedVariants[variantIndex] = updatedVariant;

    setVariants(updatedVariants);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    let productData = { ...productInput };
    productData.sizes = sizes;
    productData.tags = tags;

    if (isEditPage) {
      productData.id = productId;
      await editProduct({
        productData,
        variants,
        currentInventoryLevels,
        images,
        imagesMarkedForRemoval,
      });
    } else {
      await createProduct({ productData, variants, images });
    }

    setNavigation(true);
  };

  useEffect(() => {
    if (navigation && !error) {
      navigate('/admin/products');
    } else {
      setNavigation(false);
    }
  }, [navigation]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteOnConfirm = async () => {
    setIsConfirmOpen(false);
    await deleteProduct(productId);
    setNavigation(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const createButtonIsDisabled =
    isEditingVariants || sizes.length === 0 || variants.length === 0;

  let createButtonContent;

  if (isEditingVariants) {
    createButtonContent = `Editing...`;
  } else if (sizes.length === 0) {
    createButtonContent = `No sizes selected`;
  } else if (variants.length === 0) {
    createButtonContent = `No variants selected`;
  } else {
    if (isEditPage) {
      createButtonContent = `Update`;
    } else {
      createButtonContent = `Create`;
    }
  }

  return (
    <>
      <CenterModal
        toggleModal={closeConfirm}
        modalClassName={styles.confirm_modal}
      >
        {isConfirmOpen && (
          <ConfirmModal
            text="Are you sure you want to delete this product? There is no way to undo this."
            handleConfirm={handleDeleteOnConfirm}
          />
        )}
      </CenterModal>
      {isLoading && <Loader />}
      <section>
        <div className={`${styles.container} main-container`}>
          <h1>{isEditPage ? 'Edit' : 'Add'} Product</h1>
          <ProductForm
            isEditPage={isEditPage}
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
            handleSizesInput={handleSizesInput}
            handleProductSubmit={handleProductSubmit}
          />
          <Variants
            productInput={productInput}
            variants={variants}
            sizes={sizes}
            images={images}
            handleAddVariant={handleAddVariant}
            handleEditVariantCount={handleEditVariantCount}
            handleDeleteVariant={handleDeleteVariant}
            handleVariantEditSubmit={handleVariantEditSubmit}
          />
          <div className={styles.buttons_wrapper}>
            <Button
              type="submit"
              form="productForm"
              disabled={createButtonIsDisabled}
              className={styles.submit}
            >
              {createButtonContent}
            </Button>
            {isEditPage && (
              <Button
                onClick={() => setIsConfirmOpen(true)}
                type="button"
                className={styles.delete}
              >
                Delete Product
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProduct;
