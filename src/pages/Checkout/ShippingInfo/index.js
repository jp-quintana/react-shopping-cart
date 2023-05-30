import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { BiChevronLeft } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import Loader from 'components/Loader';
import Dropdown from 'components/Dropdown';

import { reactSelectStyles } from './data.js';

import styles from './index.module.scss';

const ShippingInfo = () => {
  const { addresses } = useAuthContext();
  const { email, shippingAddress } = useCheckoutContext();
  const { submitShippingInfo, isLoading } = useCheckout();

  const [isDisabled, setIsDisabled] = useState(false);
  const [newAddress, setNewAddress] = useState({});

  const options = [...addresses, { label: 'Add new address', value: 'new' }];

  let defaultOption;
  let initialIsNew = false;

  if (shippingAddress.hasOwnProperty('address')) {
    defaultOption = shippingAddress;
  } else {
    defaultOption = addresses.find((address) => address.isMain);

    if (!defaultOption) {
      defaultOption = {
        label: 'Add new address',
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

  return (
    <div className={styles.info_container}>
      {isLoading && (
        <Loader wrapperClassName={styles.loader_wrapper} noPortal={true} />
      )}
      {!isLoading && (
        <form className={styles.info_form} onSubmit={handleSubmit}>
          <div className={styles.contact_info_wrapper}>
            <p className={styles.title}>Contact Information</p>
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
            <p className={styles.title}>Shipping address</p>
            <Dropdown
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
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="off"
                  onChange={handleNameInput}
                  value={userInput.name}
                  className={nameStyles.input}
                  required
                  placeholder="Name"
                  disabled={isDisabled}
                />
              </div>
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
                <label htmlFor="lastName" className={lastNameStyles.label}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="off"
                  onChange={handleLastNameInput}
                  value={userInput.lastName}
                  className={lastNameStyles.input}
                  required
                  placeholder="Last Name"
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
                Address
              </label>
              <input
                id="address"
                type="text"
                autoComplete="off"
                onChange={handleAddressInput}
                value={userInput.address}
                className={addressStyles.input}
                required
                placeholder="Address"
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
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  autoComplete="off"
                  onChange={handleCityInput}
                  value={userInput.city}
                  className={cityStyles.input}
                  required
                  placeholder="City"
                  disabled={isDisabled}
                />
              </div>
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
                <label htmlFor="zipCode" className={zipCodeStyles.label}>
                  Zip Code
                </label>
                <input
                  id="zipCode"
                  type="text"
                  autoComplete="off"
                  onChange={handleZipCodeInput}
                  value={userInput.zipCode}
                  className={zipCodeStyles.input}
                  required
                  placeholder="Zip Code"
                  disabled={isDisabled}
                />
              </div>
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
                <label htmlFor="province" className={provinceStyles.label}>
                  State
                </label>
                <input
                  id="province"
                  type="text"
                  autoComplete="off"
                  onChange={handleProvinceInput}
                  value={userInput.province}
                  className={provinceStyles.input}
                  required
                  placeholder="State"
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
                Phone
              </label>
              <input
                id="phoneNumber"
                type="tel"
                autoComplete="off"
                onChange={handlePhoneNumberInput}
                value={userInput.phoneNumber}
                className={phoneNumberStyles.input}
                required
                placeholder="Phone"
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className={styles.form_controls}>
            <Link className={styles.back_link} to="/carrito">
              <span>
                <BiChevronLeft />
              </span>
              Back to cart
            </Link>
            <button className={styles.button} type="submit">
              Continue to shipping
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShippingInfo;
