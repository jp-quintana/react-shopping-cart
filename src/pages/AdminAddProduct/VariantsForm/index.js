import { FaQuestionCircle } from 'react-icons/fa';

import Button from 'components/Button';
import ToolTip from 'components/ToolTip';
import CenterModal from 'components/CenterModal';

import styles from './index.module.scss';

const VariantsForm = ({ variants, sizes, baseSku, images }) => {
  const skuSizeCode = {
    s: 'sm',
    m: 'md',
    l: 'lg',
    xl: 'xl',
    xxl: 'xx',
  };
  return (
    <>
      <CenterModal></CenterModal>
      <div className={styles.container}>
        {[...Array(variants).keys()].map((key) => (
          <div className={styles.table_container}>
            <p className={styles.variant_number}>Variant {+key + 1}:</p>

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
                          Solo tildar si el género gramatical del tipo de
                          producto no coincide con el género gramatical del
                          color del casillero anterior. Ejemplo: remera y
                          blanco.
                        </ToolTip>
                        <i>
                          <FaQuestionCircle />
                        </i>
                      </span>
                    </th>
                    <th>
                      <span className={styles.table_header}>Price</span>
                    </th>
                    {/* <th>
                    <span>Url</span>
                  </th> */}
                    <th>
                      <span className={styles.table_header}>SKU</span>
                    </th>
                    <th>
                      <span className={styles.table_header}>Inventory</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((size, index) => (
                    <tr>
                      <td className={styles.size}>{size}</td>
                      <td>
                        {index === 0 && (
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
                          <Button
                            className={styles.images_button}
                            type="button"
                          >
                            Select
                          </Button>
                        )}
                      </td>
                      <td>{index === 0 && <input type="text" />}</td>
                      <td>{index === 0 && <input type="checkbox" />}</td>
                      <td>{index === 0 && <input type="number" />}</td>
                      {/* <td>
                      {index === 0 && (
                        <input type="text" placeholder="remera-flaakko-negra" />
                      )}
                    </td> */}
                      <td>{(baseSku + skuSizeCode[size]).toUpperCase()}</td>
                      <td>
                        <input type="number" min="0" step="1" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VariantsForm;
