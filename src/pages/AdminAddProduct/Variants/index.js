import VariantForm from './VariantForm';

import CenterModal from 'components/CenterModal';

import styles from './index.module.scss';

const Variants = ({
  variants,
  sizes,
  images,
  isEditingVariant,
  isEditingOtherVariant,
  handleInventoryInput,
  handleEditVariant,
  handleVariantEditSubmit,
}) => {
  return (
    <>
      <CenterModal></CenterModal>
      <div className={styles.container}>
        {variants.map((variant, variantIndex) => (
          <VariantForm
            key={variant.id}
            variant={variant}
            variantIndex={variantIndex}
            images={images}
            sizes={sizes}
            isEditing={isEditingVariant === variantIndex}
            isEditingOtherVariant={isEditingOtherVariant}
            handleEditVariant={handleEditVariant}
            handleVariantEditSubmit={handleVariantEditSubmit}
          />
        ))}
      </div>
    </>
  );
};

export default Variants;
