import { useState } from 'react';

import { Link } from 'react-router-dom';

import Select from 'react-select';

import { BiChevronLeft } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import Loader from 'components/Loader';

import styles from './index.module.scss';
import { useEffect } from 'react';

const ShippingInfo = () => {
  const { addresses } = useAuthContext();
  const { email, shippingAddress } = useCheckoutContext();
  const { submitShippingInfo, isLoading } = useCheckout();

  const [isDisabled, setIsDisabled] = useState(false);

  const options = [
    ...addresses,
    { label: 'Agregar Dirección Nueva', value: 'new' },
  ];

  let defaultOption;

  if (shippingAddress.hasOwnProperty('address')) {
    defaultOption = shippingAddress;
  } else {
    defaultOption = addresses.find((address) => address.isMain);

    if (!defaultOption) {
      defaultOption = { label: 'Agregar Dirección Nueva', value: 'new' };
    }
  }

  const [userInput, setUserInput] = useState({
    email: email || '',
    name: shippingAddress.name || defaultOption.name || '',
    lastName: shippingAddress.lastName || defaultOption.lastName || '',
    address: shippingAddress.address || defaultOption.address || '',
    city: shippingAddress.city || defaultOption.city || '',
    province: shippingAddress.province || defaultOption.province || '',
    zipCode: shippingAddress.zipCode || defaultOption.zipCode || '',
    phoneNumber: shippingAddress.phoneNumber || defaultOption.phoneNumber || '',
    label: shippingAddress.label || defaultOption.label || '',
    value: shippingAddress.value || defaultOption.value || '',
  });

  useEffect(() => {
    if (userInput.value === 'new') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userInput.value]);

  const handleSelectAddress = (option) => {
    console.log(option);
    setUserInput((prevState) => ({
      ...prevState,
      name: option.name || '',
      lastName: option.lastName || '',
      address: option.address || '',
      city: option.city || '',
      province: option.province || '',
      zipCode: option.zipCode || '',
      phoneNumber: option.phoneNumber || '',
      label: option.label || '',
      value: option.value || '',
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                disabled={isDisabled}
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
