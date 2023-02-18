import { useState, useEffect } from 'react';

import { FaQuestionCircle } from 'react-icons/fa';

import ImageSelect from './ImageSelect';

import Button from 'components/Button';
import ToolTip from 'components/ToolTip';
import CenterModal from 'components/CenterModal';

import styles from './index.module.scss';

const VariantForm = ({
  productInput,
  variant,
  variantIndex,
  images,
  sizes,
  handleEditVariant,
  handleDeleteVariant,
  handleVariantEditSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [detailsInput, setDetailsInput] = useState({
    color: variant.color,
    colorDisplay: variant.colorDisplay,
    price: variant.price,
  });

  const [inventoryInput, setInventoryInput] = useState(variant.inventory);
  const [variantTitleInventory, setVariantTitleInventory] = useState('');

  // const skuSizeCode = {
  //   s: 'sm',
  //   m: 'md',
  //   l: 'lg',
  //   xl: 'xl',
  //   xxl: 'xx',
  // };

  const handleEditStart = () => {
    setIsEditing(true);
    handleEditVariant(1);
  };

  const handleEditCancel = () => {
    const { inventory, ...details } = variant;
    setDetailsInput(details);
    setInventoryInput(inventory);
    setIsEditing(false);
    handleEditVariant(-1);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (sizes.length > 0) {
      handleVariantEditSubmit({
        variantIndex,
        id: variant.id,
        color: detailsInput.color.toLowerCase(),
        colorDisplay: detailsInput.colorDisplay.toLowerCase(),
        price: +detailsInput.price,
        inventory: inventoryInput,
      });
    }
    setIsEditing(false);
  };

  let variantTitleColor = variant.colorDisplay
    ? variant.colorDisplay
    : variant.color;

  const createVariantTitleInventory = () => {
    let text = ' - Inventory: ( ';
    for (const size of sizes) {
      text += `${size.toUpperCase()}: ${variant.inventory[size]} `;
    }
    return (text += ')');
  };

  useEffect(() => {
    setVariantTitleInventory(createVariantTitleInventory());
  }, [variant.inventory, sizes]);

  let variantTitle = `Variant ${variantIndex + 1}: ${productInput.type} ${
    productInput.model
  } ${variantTitleColor} ${variantTitleInventory}`;

  let buttonsContainerEditingStyles = isEditing
    ? styles.buttons_container_editing
    : '';

  let tableWrapperEditingStyles = isEditing ? styles.table_wrapper_editing : '';

  return (
    <>
      <CenterModal modalClassName={styles.modal}>
        <ImageSelect images={images} />
      </CenterModal>
      <form onSubmit={handleEditSubmit} className={styles.form_container}>
        <div
          className={`${styles.buttons_container} ${buttonsContainerEditingStyles}`}
        >
          <p className={styles.variant_title}>{variantTitle}</p>
          <div className={styles.buttons_wrapper}>
            {isEditing && (
              <>
                <Button className={styles.submit} type="submit">
                  Submit
                </Button>
                <Button
                  className={styles.cancel}
                  onClick={handleEditCancel}
                  type="button"
                >
                  Cancel
                </Button>
              </>
            )}
            {!isEditing && (
              <>
                <Button
                  className={styles.edit}
                  type="button"
                  onClick={handleEditStart}
                >
                  Edit
                </Button>
                <Button
                  className={styles.delete}
                  type="button"
                  onClick={() => handleDeleteVariant(variantIndex)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
        {isEditing && (
          <div
            className={`${styles.table_wrapper} ${tableWrapperEditingStyles}`}
          >
            {sizes.length === 0 && (
              <p className={styles.no_sizes}>Please choose sizes.</p>
            )}
            {sizes.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>
                      <span className={styles.table_header}>Sizes</span>
                    </th>
                    <th>
                      <span className={styles.table_header}>Images</span>
                    </th>
                    <th>
                      <span className={styles.color_header}>
                        Color
                        <ToolTip className={styles.tooltip}>
                          Escribir color masculino. Ejemplo: blanco sí, blanca
                          no.
                        </ToolTip>
                        <i>
                          <FaQuestionCircle />
                        </i>
                      </span>
                    </th>
                    <th>
                      <span className={styles.color_header}>
                        Color Display
                        <ToolTip className={styles.tooltip}>
                          Escribir color con género gramatical correcto según el
                          tipo de producto. Ejemplo: remera y blanco, escribir
                          blanca.
                        </ToolTip>
                        <i>
                          <FaQuestionCircle />
                        </i>
                      </span>
                    </th>
                    <th>
                      <span className={styles.table_header}>Price</span>
                    </th>

                    <th>
                      <span className={styles.table_header}>Inventory</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((size, sizeIndex) => (
                    <tr key={size}>
                      <td className={styles.size}>{size}</td>
                      <td>
                        {sizeIndex === 0 && (
                          // <ul className={styles.image_links}>
                          //   {images.map((image) => (
                          //     <li className={styles.image_link}>
                          //       <input
                          //         type="checkbox"
                          //         key={image.name}
                          //         value={image.name}
                          //       />
                          //       <div>
                          //         <label htmlFor={image.name}>{image.name}</label>
                          //       </div>
                          //     </li>
                          //   ))}
                          // </ul>
                          <div className={styles.images_button_wrapper}>
                            {images.length === 0 && <p>No Images Uploaded</p>}
                            {images.length > 0 && (
                              <Button
                                className={styles.images_button}
                                type="button"
                              >
                                Select
                              </Button>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        {sizeIndex === 0 && (
                          <>
                            <input
                              type="text"
                              value={detailsInput.color}
                              onChange={(e) =>
                                setDetailsInput((prevState) => ({
                                  ...prevState,
                                  color: e.target.value,
                                }))
                              }
                              disabled={!isEditing}
                              required
                            />
                          </>
                        )}
                      </td>
                      <td>
                        {sizeIndex === 0 && (
                          <input
                            type="text"
                            value={detailsInput.colorDisplay}
                            onChange={(e) =>
                              setDetailsInput((prevState) => ({
                                ...prevState,
                                colorDisplay: e.target.value,
                              }))
                            }
                            disabled={!isEditing}
                          />
                        )}
                      </td>
                      <td>
                        {sizeIndex === 0 && (
                          <input
                            type="number"
                            value={detailsInput.price}
                            onChange={(e) =>
                              setDetailsInput((prevState) => ({
                                ...prevState,
                                price: e.target.value,
                              }))
                            }
                            disabled={!isEditing}
                            required
                          />
                        )}
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={inventoryInput[size]}
                          onChange={(e) =>
                            setInventoryInput((prevState) => ({
                              ...prevState,
                              [size]: +e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </form>
    </>
  );
};

export default VariantForm;
