import { useState } from 'react';

import { FaTrash } from 'react-icons/fa';

import EditAddress from './EditAddress';

import { CenterModal } from 'components/common';

import styles from './index.module.scss';

const Address = ({
  id,
  name,
  lastName,
  phoneNumber,
  address,
  zipCode,
  city,
  state,
  isMain,
  displayOrder,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    await onDelete(id);
  };

  return (
    <>
      <CenterModal modalClassName={styles.modal} close={() => setIsOpen(false)}>
        {isOpen && (
          <EditAddress
            close={() => setIsOpen((prevState) => !prevState)}
            name={name}
            lastName={lastName}
            phoneNumber={phoneNumber}
            address={address}
            zipCode={zipCode}
            city={city}
            state={state}
            isMain={isMain}
            id={id}
            displayOrder={displayOrder}
          />
        )}
      </CenterModal>
      <div className={styles.card}>
        {isMain && <h3 className={styles.title}>Primary address</h3>}
        {!isMain && <h3 className={styles.title}>Address {displayOrder}</h3>}
        <div className={styles.content}>
          <h4 className={styles.name}>
            {name} {lastName}
          </h4>
          <ul className={styles.info}>
            <li>{address}</li>
            <li>
              {city}, {state} {zipCode}
            </li>
          </ul>
          <div className={styles.controls}>
            <div className={styles.edit} onClick={() => setIsOpen(true)}>
              Edit
            </div>
            <div className={styles.delete}>
              <FaTrash className={styles.delete_icon} onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Address;
