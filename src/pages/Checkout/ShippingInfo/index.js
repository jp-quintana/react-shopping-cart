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
  const [newAddress, setNewAddress] = useState({});

  const options = [
    ...addresses,
    { label: 'Agregar Dirección Nueva', value: 'new' },
  ];

  let defaultOption;
  let initialIsNew = false;

  if (shippingAddress.hasOwnProperty('address')) {
    console.log(shippingAddress);
    defaultOption = shippingAddress;
  } else {
    defaultOption = addresses.find((address) => address.isMain);

    if (!defaultOption) {
      defaultOption = {
        label: 'Agregar Dirección Nueva',
        value: 'new',
      };
      initialIsNew = true;
    }
  }

  const [userInput, setUserInput] = useState({
    email: email || '',
    id: defaultOption.id || '',
    name: defaultOption.name || '',
    lastName: defaultOption.lastName || '',
    address: defaultOption.address || '',
    city: defaultOption.city || '',
    province: defaultOption.province || '',
    zipCode: defaultOption.zipCode || '',
    phoneNumber: defaultOption.phoneNumber || '',
    label: defaultOption.label || '',
    value: defaultOption.value || '',
    isNew: initialIsNew,
  });

  useEffect(() => {
    if (userInput.value === 'new') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userInput.value]);

  const handleSelectAddress = (option) => {
    if (option.value === 'new') {
      setUserInput((prevState) => ({
        ...prevState,
        id: newAddress.id || '',
        name: newAddress.name || '',
        lastName: newAddress.lastName || '',
        address: newAddress.address || '',
        city: newAddress.city || '',
        province: newAddress.province || '',
        zipCode: newAddress.zipCode || '',
        phoneNumber: newAddress.phoneNumber || '',
        label: option.label,
        value: option.value,
        isNew: true,
      }));
    } else {
      setUserInput((prevState) => ({
        ...prevState,
        id: option.id || '',
        name: option.name || '',
        lastName: option.lastName || '',
        address: option.address || '',
        city: option.city || '',
        province: option.province || '',
        zipCode: option.zipCode || '',
        phoneNumber: option.phoneNumber || '',
        label: option.label,
        value: option.value,
        isNew: false,
      }));
    }
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
    setNewAddress((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));

    setUserInput((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleLastNameInput = (e) => {
    setNewAddress((prevState) => ({
      ...prevState,
      lastName: e.target.value,
    }));

    setUserInput((prevState) => ({
      ...prevState,
      lastName: e.target.value,
    }));
  };

  const handleAddressInput = (e) => {
    setNewAddress((prevState) => ({
      ...prevState,
      address: e.target.value,
    }));

    setUserInput((prevState) => ({
      ...prevState,
      address: e.target.value,
    }));
  };

  const handleCityInput = (e) => {
    setNewAddress((prevState) => ({
      ...prevState,
      city: e.target.value,
    }));

    setUserInput((prevState) => ({
      ...prevState,
      city: e.target.value,
    }));
  };

  const handleProvinceInput = (e) => {
    setNewAddress((prevState) => ({
      ...prevState,
      province: e.target.value,
    }));

    setUserInput((prevState) => ({
      ...prevState,
      province: e.target.value,
    }));
  };

  const handleZipCodeInput = (e) => {
    setNewAddress((prevState) => ({
      ...prevState,
      zipCode: e.target.value,
    }));

    setUserInput((prevState) => ({
      ...prevState,
      zipCode: e.target.value,
    }));
  };

  const handlePhoneNumberInput = (e) => {
    setNewAddress((prevState) => ({
      ...prevState,
      phoneNumber: e.target.value,
    }));

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

  const reactSelectStyles = {
    option: (baseStyles, { isSelected }) => ({
      ...baseStyles,
      backgroundColor: isSelected ? '#787878 !important' : 'transparent',
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'Inter',
      fontWeight: isSelected ? 'bold' : 'normal',
      letterSpacing: '-0.05rem',
      fontSize: '1.6rem',
      width: '97%',
      borderRadius: '1rem',
      margin: '.5rem auto',
      '&:hover': {
        backgroundColor: '#3c3c3c',
      },
    }),

    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: 'white',
      fontFamily: 'Inter',
      fontWeight: 'bold',
      letterSpacing: '-0.05rem',
      fontSize: '1.6rem',
    }),

    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      padding: '1.5rem 0',
      border: '1px solid #515255',
      borderRadius: '1rem',
      backdropFilter: 'blur(8px)',
      isSelected: true,
    }),

    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: '#616161',
      '&:hover': {
        backgroundColor: '616161',
      },
    }),

    dropdownIndicator: (baseStyles, { isFocused }) => ({
      ...baseStyles,
      color: isFocused ? 'white' : '#616161',
      '&:hover': {
        color: 'white',
      },
    }),

    control: (baseStyles, { isFocused }) => ({
      ...baseStyles,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: '1.5rem 0',
      borderRadius: '1rem',
      cursor: 'pointer',
      boxShadow: 'none',
      border: isFocused ? '1px solid #fff' : '1px solid #515255',
      '&:hover': {
        border: isFocused ? '1px solid #fff' : '1px solid #515255',
      },
    }),
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
              />
            </div>
          </div>
          <div className={styles.shipping_address_wrapper}>
            <p className={styles.title}>Dirección de Envío</p>
            <Select
              styles={reactSelectStyles}
              options={options}
              isSearchable={false}
              onChange={handleSelectAddress}
              defaultValue={defaultOption}
            />
            <div className={styles.name_wrapper}>
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
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
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
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
            <div
              className={`${styles.float_container} ${
                isDisabled ? styles.disabled : ''
              }`}
            >
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
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
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
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
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
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
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
            </div>
            <div
              className={`${styles.float_container} ${
                isDisabled ? styles.disabled : ''
              }`}
            >
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
