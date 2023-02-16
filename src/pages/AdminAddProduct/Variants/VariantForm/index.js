import { useState, useRef } from 'react';

import { FaQuestionCircle } from 'react-icons/fa';

import Button from 'components/Button';
import ToolTip from 'components/ToolTip';

import styles from './index.module.scss';

const VariantForm = ({
  variant,
  variantIndex,
  sizes,
  isEditing,
  isEditingOtherVariant,
  handleEditVariant,
  handleVariantEditSubmit,
}) => {
  // const [isEditing, setIsEditing] = useState(false)

  const [detailsInput, setDetailsInput] = useState({
    color: variant.color,
    isColorAlt: variant.isColorAlt,
    price: variant.price,
  });

  const [inventoryInput, setInventoryInput] = useState(variant.inventory);

  const skuSizeCode = {
    s: 'sm',
    m: 'md',
    l: 'lg',
    xl: 'xl',
    xxl: 'xx',
  };

  // let skuColorCode;

  // if (colorInput.split('')[1]) {

  // }

  const handleEditStart = (e) => {
    if (!isEditingOtherVariant) {
      handleEditVariant(variantIndex);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    handleVariantEditSubmit({
      variantIndex,
      id: variant.id,
      color: detailsInput.color,
      isAltColor: detailsInput.isAltColor,
      price: +detailsInput.price,
      inventory: inventoryInput,
    });
  };

  const handleEditCancel = () => {
    const { inventory, ...details } = variant;
    setDetailsInput(details);
    setInventoryInput(inventory);
    handleEditVariant(-1);
  };

  return (
    <>
      <form onSubmit={handleEditSubmit} className={styles.form_container}>
        <div className={styles.buttons_container}>
          <p className={styles.variant_number}>Variant {variantIndex + 1}:</p>
          <div className={styles.buttons_wrapper}>
            {isEditing && (
              <>
                <Button
                  form={variant.id}
                  className={styles.submit}
                  type="submit"
                >
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
              <Button
                className={styles.edit}
                type="button"
                onClick={handleEditStart}
                disabled={isEditingOtherVariant}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className={styles.table_wrapper}>
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
                      Color masculino. Ejemplo: blanco sí, blanca no.
                    </ToolTip>
                    <i>
                      <FaQuestionCircle />
                    </i>
                  </span>
                </th>
                <th>
                  <span className={styles.color_header}>
                    Color Alt
                    <ToolTip className={styles.tooltip}>
                      Solo tildar si el género gramatical del tipo de producto
                      no coincide con el género gramatical del color del
                      casillero anterior. Ejemplo: remera y blanco.
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
                        <Button className={styles.images_button} type="button">
                          Select
                        </Button>
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
                        type="checkbox"
                        checked={detailsInput.isAltColor}
                        onChange={(e) =>
                          setDetailsInput((prevState) => ({
                            ...prevState,
                            isAltColor: e.target.checked,
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
        </div>
      </form>
    </>
  );
};

export default VariantForm;
