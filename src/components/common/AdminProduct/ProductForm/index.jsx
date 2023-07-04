import { DragDropFileInput, TagsInput } from 'components/common';

import styles from './index.module.scss';

const ProductForm = ({
  isEditPage,
  images,
  productInput,
  tags,
  handleImagesInput,
  handleDeleteImage,
  handleModelInput,
  handleTypeInput,
  handleCollectionInput,
  handleDescriptionInput,
  handleTagsInput,
  handleDeleteTags,
  handleSkuInput,
  handleSizesInput,
  handleProductSubmit,
}) => {
  return (
    <>
      <div className={styles.form_wrapper}>
        <form
          id="productForm"
          onSubmit={handleProductSubmit}
          className={styles.form}
        >
          <div className={styles.images_wrapper}>
            <label htmlFor="file" className={styles.label}>
              <span>All images:</span>
            </label>
            <DragDropFileInput
              name="file"
              title="images"
              type="image"
              files={images}
              accept="image/*"
              handleFileInput={handleImagesInput}
              handleDeleteFile={handleDeleteImage}
              needsConfirmOnDelete={true}
              additionalConfirmText={
                isEditPage
                  ? 'These changes will only be saved if you click on update button at the end of form!'
                  : 'File will be deleted once you press confirm!'
              }
              previewImages={true}
            />
          </div>
          <label className={styles.label}>
            <span>Model:</span>
            <input
              type="text"
              onChange={handleModelInput}
              value={productInput.model}
              required
            />
          </label>
          <label className={styles.label}>
            <span>Type:</span>
            <input
              type="text"
              onChange={handleTypeInput}
              value={productInput.type}
              required
            />
          </label>
          <label className={styles.label}>
            <span>Collection:</span>
            <select
              onChange={handleCollectionInput}
              value={productInput.collection}
              required
            >
              <option value="" disabled>
                Select your option
              </option>
              <option value="remeras">remeras</option>
              <option value="buzos">buzos</option>
              <option value="accesorios">accesorios</option>
            </select>
          </label>
          <label className={styles.label}>
            <span>Description:</span>
            <textarea
              type="text"
              onChange={handleDescriptionInput}
              value={productInput.description}
              required
            />
          </label>
          <label htmlFor="tags" className={styles.label}>
            <span>Tags:</span>
          </label>
          <TagsInput
            id="tags"
            tags={tags}
            tagsInput={productInput.tags}
            handleTagsInput={handleTagsInput}
            handleDeleteTags={handleDeleteTags}
            className={styles.tags_input}
          />
          <label className={styles.label}>
            <span>SKU:</span>
            <input
              type="text"
              onChange={handleSkuInput}
              value={productInput.sku}
              maxLength="6"
              required
            />
          </label>
          <fieldset>
            <legend>Sizes:</legend>
            <div className={styles.checkbox_wrapper}>
              {Object.keys(productInput.sizes).map((key) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    value={key}
                    checked={productInput.sizes[key]}
                    onChange={handleSizesInput}
                  />
                  <span>{key.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
