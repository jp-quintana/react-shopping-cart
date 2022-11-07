import { useState, useRef } from 'react';

import CenterModal from 'common/CenterModal';

import styles from './index.module.scss';

const EditAddressModal = ({
  toggleEditAddressModal,
  name,
  lastName,
  phoneNumber,
  address,
  zipCode,
  city,
  province,
  isDefault,
}) => {
  const [isChecked, setIsChecked] = useState(isDefault);

  const nameInput = useRef();
  const lastNameInput = useRef();
  const phoneNumberInput = useRef();
  const addressInput = useRef();
  const zipCodeInput = useRef();
  const cityInput = useRef();
  const provinceInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameInput.current.value,
      lastName: lastNameInput.current.value,
      phoneNumber: phoneNumberInput.current.value,
      address: addressInput.current.value,
      zipCode: zipCodeInput.current.value,
      city: cityInput.current.value,
      province: provinceInput.current.value,
      isDefault: isChecked,
    });
  };

  const handleCheckboxInput = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <CenterModal toggleModal={toggleEditAddressModal}>
      <form id="form" className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Editar datos:</h2>
        <div className={styles.form_inputs_wrapper}>
          <label>
            <span>Nombre:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre"
              required
              ref={nameInput}
              defaultValue={name}
            />
          </label>
          <label>
            <span>Apellido:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Apellido"
              required
              ref={lastNameInput}
              defaultValue={lastName}
            />
          </label>
          <label>
            <span>Teléfono:</span>
            <input
              className={styles.input}
              type="tel"
              required
              ref={phoneNumberInput}
              defaultValue={phoneNumber}
            />
          </label>
          <label>
            <span>Dirección:</span>
            <input
              className={styles.input}
              type="text"
              required
              ref={addressInput}
              defaultValue={address}
            />
          </label>
          <label>
            <span>Código Postal:</span>
            <input
              className={styles.input}
              type="text"
              inputMode="numeric"
              required
              ref={zipCodeInput}
              defaultValue={zipCode}
            />
          </label>
          <label>
            <span>Ciudad/Localidad:</span>
            <input
              className={styles.input}
              type="text"
              required
              ref={cityInput}
              defaultValue={city}
            />
          </label>
          <label>
            <span>Provincia</span>
            <input
              className={styles.input}
              type="text"
              required
              ref={provinceInput}
              defaultValue={province}
            />
          </label>
          <label className={styles.checkbox}>
            <input
              className={styles.input}
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxInput}
            />
            <div>Direccion predeterminada</div>
          </label>
        </div>
        <div className={styles.button_wrapper}>
          <button form="form" className={styles.button} type="submit">
            Editar
          </button>
        </div>
      </form>
    </CenterModal>
  );
};

export default EditAddressModal;
