import { useState } from 'react';

import { Link } from 'react-router-dom';

import Select from 'react-select';

import { BiChevronLeft } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import Loader from 'components/Loader';

import styles from './index.module.scss';

const ShippingInfo = () => {
  const { addresses } = useAuthContext();
  const { email, shippingAddress } = useCheckoutContext();
  const { submitShippingInfo, isLoading } = useCheckout();

  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState(true);

  const [userInput, setUserInput] = useState({
    email: email || '',
    name: selectedOption.name || '',
    lastName: selectedOption.lastName || '',
    address: selectedOption.address || '',
    city: selectedOption.city || '',
    province: selectedOption.province || '',
    zipCode: selectedOption.zipCode || '',
    phoneNumber: selectedOption.phoneNumber || '',
  });

  const defaultOption = addresses.find((address) => address.isMain);
  const options = [...addresses, { label: 'Dirección nueva', value: 'new' }];

  const handleSelectAddress = (option) => {
    console.log(option);
    setUserInput((prevState) => ({
      ...prevState,
      name: option.name,
      lastName: option.lastName,
      address: option.address,
      city: option.city,
      province: option.province,
      zipCode: option.zipCode,
      phoneNumber: option.phoneNumber,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitShippingInfo(userInput);
  };

  const handleEmailInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const handleNameInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleLastNameInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      lastName: e.target.value,
    }));
  };

  const handleAddressInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      address: e.target.value,
    }));
  };

  const handleCityInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      city: e.target.value,
    }));
  };

  const handleProvinceInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      province: e.target.value,
    }));
  };

  const handleZipCodeInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      zipCode: e.target.value,
    }));
  };

  const handlePhoneNumberInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      phoneNumber: e.target.value,
    }));
  };

  const emailStyles = {
    label:
      userInput.email.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.email.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const nameStyles = {
    label:
      userInput.name.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.name.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const lastNameStyles = {
    label:
      userInput.lastName.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.lastName.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };

  const addressStyles = {
    label:
      userInput.address.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.address.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const cityStyles = {
    label:
      userInput.city.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.city.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const provinceStyles = {
    label:
      userInput.province.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.province.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };

  const zipCodeStyles = {
    label:
      userInput.zipCode.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.zipCode.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const phoneNumberStyles = {
    label:
      userInput.phoneNumber.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.phoneNumber.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };

  console.log(addresses);

  return (
    <div className={styles.info_container}>
      {isLoading && (
        <Loader wrapperClassName={styles.loader_wrapper} noPortal={true} />
      )}
      {!isLoading && (
        <form className={styles.info_form} onSubmit={handleSubmit}>
          <div className={styles.contact_info_wrapper}>
            <p className={styles.title}>Información de Contacto</p>
            <div className={styles.float_container}>
              <label htmlFor="email" className={emailStyles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="off"
                onChange={handleEmailInput}
                value={userInput.email}
                className={emailStyles.input}
                required
                placeholder="Email"
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className={styles.shipping_address_wrapper}>
            <p className={styles.title}>Dirección de Envío</p>
            <Select
              // styles={{
              //   control: (baseStyles, state) => ({
              //     ...baseStyles,
              //     backgroundColor: 'transparent',
              //   }),
              // }}
              options={options}
              onChange={handleSelectAddress}
              defaultValue={defaultOption}
            />
            <div className={styles.name_wrapper}>
              <div className={styles.float_container}>
                <label htmlFor="name" className={nameStyles.label}>
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="off"
                  onChange={handleNameInput}
                  value={userInput.name}
                  className={nameStyles.input}
                  required
                  placeholder="Nombre"
                />
              </div>
              <div className={styles.float_container}>
                <label htmlFor="lastName" className={lastNameStyles.label}>
                  Apellido
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="off"
                  onChange={handleLastNameInput}
                  value={userInput.lastName}
                  className={lastNameStyles.input}
                  required
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div className={styles.float_container}>
              <label htmlFor="address" className={addressStyles.label}>
                Dirección
              </label>
              <input
                id="address"
                type="text"
                autoComplete="off"
                onChange={handleAddressInput}
                value={userInput.address}
                className={addressStyles.input}
                required
                placeholder="Dirección"
              />
            </div>
            <div className={styles.zip_wrapper}>
              <div className={styles.float_container}>
                <label htmlFor="city" className={cityStyles.label}>
                  Ciudad
                </label>
                <input
                  id="city"
                  type="text"
                  autoComplete="off"
                  onChange={handleCityInput}
                  value={userInput.city}
                  className={cityStyles.input}
                  required
                  placeholder="Ciudad"
                />
              </div>
              <div className={styles.float_container}>
                <label htmlFor="province" className={provinceStyles.label}>
                  Provincia
                </label>
                <input
                  id="province"
                  type="text"
                  autoComplete="off"
                  onChange={handleProvinceInput}
                  value={userInput.province}
                  className={provinceStyles.input}
                  required
                  placeholder="Provincia"
                />
              </div>
              <div className={styles.float_container}>
                <label htmlFor="zipCode" className={zipCodeStyles.label}>
                  Código Postal
                </label>
                <input
                  id="zipCode"
                  type="text"
                  autoComplete="off"
                  onChange={handleZipCodeInput}
                  value={userInput.zipCode}
                  className={zipCodeStyles.input}
                  required
                  placeholder="Código Postal"
                />
              </div>
            </div>
            <div className={styles.float_container}>
              <label htmlFor="phoneNumber" className={phoneNumberStyles.label}>
                Teléfono
              </label>
              <input
                id="phoneNumber"
                type="tel"
                autoComplete="off"
                onChange={handlePhoneNumberInput}
                value={userInput.phoneNumber}
                className={phoneNumberStyles.input}
                required
                placeholder="Teléfono"
              />
            </div>
          </div>
          <div className={styles.form_controls}>
            <Link className={styles.back_link} to="/carrito">
              <span>
                <BiChevronLeft />
              </span>
              Volver a carrito
            </Link>
            <button className={styles.button} type="submit">
              Continuar a envío
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShippingInfo;
