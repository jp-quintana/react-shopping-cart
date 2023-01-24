import { useState } from 'react';

import { FaTrash } from 'react-icons/fa';

import EditAddress from './EditAddress';

import CenterModal from 'components/CenterModal';

import styles from './index.module.scss';

const Address = ({
  id,
  name,
  lastName,
  phoneNumber,
  address,
  zipCode,
  city,
  province,
  isMain,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEditAddressModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDelete = async () => {
    await onDelete(id);
  };

  return (
    <>
      <CenterModal
        modalClassName={styles.modal}
        toggleModal={toggleEditAddressModal}
      >
        {isOpen && (
          <EditAddress
            toggleEditAddressModal={toggleEditAddressModal}
            name={name}
            lastName={lastName}
            phoneNumber={phoneNumber}
            address={address}
            zipCode={zipCode}
            city={city}
            province={province}
            isMain={isMain}
            id={id}
          />
        )}
      </CenterModal>
      <div className={styles.card}>
        {isMain && <h3 className={styles.title}>Direccion predeterminada</h3>}
        {!isMain && <h3 className={styles.title}>Direccion {id}</h3>}
        <div className={styles.content}>
          <h4 className={styles.name}>
            {name} {lastName}
          </h4>
          <ul className={styles.info}>
            <li>{address}</li>
            <li>
              {city}, {zipCode}
            </li>
            <li>{province}</li>
          </ul>
          <div className={styles.controls}>
            <div className={styles.edit} onClick={toggleEditAddressModal}>
              Editar
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
