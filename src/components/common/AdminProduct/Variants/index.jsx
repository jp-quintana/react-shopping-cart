import VariantForm from './VariantForm';

import { FaPlusCircle } from 'react-icons/fa';

import { Button } from 'components/common';

import styles from './index.module.scss';

const Variants = ({
  productInput,
  variants,
  sizes,
  images,
  handleAddVariant,
  handleEditVariantCount,
  handleDeleteVariant,
  handleVariantEditSubmit,
}) => {
  return (
    <>
      <div className={styles.section}>
        <p className={styles.label}>Variants:</p>
        {variants.length > 0 && (
          <div className={styles.variants_container}>
            {variants.map((variant, variantIndex) => (
              <VariantForm
                key={variant.id}
                productInput={productInput}
                variant={variant}
                variantIndex={variantIndex}
                images={images}
                sizes={sizes}
                handleEditVariantCount={handleEditVariantCount}
                handleDeleteVariant={handleDeleteVariant}
                handleVariantEditSubmit={handleVariantEditSubmit}
              />
            ))}
          </div>
        )}
        <Button
          className={styles.add_variant_button}
          type="button"
          onClick={handleAddVariant}
        >
          Add Variant{' '}
          <i>
            <FaPlusCircle />
          </i>
        </Button>
      </div>
    </>
  );
};

export default Variants;
