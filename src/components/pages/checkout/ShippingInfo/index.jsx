import { useState, useEffect } from 'react';

import { BiChevronLeft } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import Dropdown from 'components/common/Dropdown';

import { reactSelectStyles } from './data';

import styles from './index.module.scss';

const ShippingInfo = () => {
  const { addresses } = useAuthContext();
  const { email, shippingAddress } = useCheckoutContext();
  const { submitShippingInfo, isLoading } = useCheckout();

  const options = [...addresses, { label: 'Add new address', value: 'new' }];

  const [isDisabled, setIsDisabled] = useState(false);
  const [defaultOption, setDefaultOption] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const [userInput, setUserInput] = useState({
    email,
    id: '',
    name: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    label: '',
    value: '',
  });

  useEffect(() => {
    if (Object.keys(shippingAddress).length > 0) {
      setDefaultOption(
        options.find((option) => option.value === shippingAddress.value)
      );
      setUserInput({ ...userInput, ...shippingAddress });
    } else {
      const mainAddress = options.find((option) => option.isMain);

      if (!mainAddress) {
        setDefaultOption({ label: 'Add new address', value: 'new' });
        setUserInput({
          label: 'Add new Address',
          value: 'new',
        });
      } else {
        setDefaultOption(mainAddress);
        setUserInput({ ...userInput, ...mainAddress });
      }
    }
  }, []);

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
        state: newAddress.state || '',
        zipCode: newAddress.zipCode || '',
        phoneNumber: newAddress.phoneNumber || '',
        label: option.label,
        value: option.value,
      }));
    } else {
      setUserInput((prevState) => ({
        ...prevState,
        id: option.id || '',
        name: option.name || '',
        lastName: option.lastName || '',
        address: option.address || '',
        city: option.city || '',
        state: option.state || '',
        zipCode: option.zipCode || '',
        phoneNumber: option.phoneNumber || '',
        label: option.label,
        value: option.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitShippingInfo(userInput);
  };

  const handleInput = (key, value) => {
    setUserInput((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    setNewAddress((prevState) => ({
      ...prevState,
      [key]: value,
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

  const stateStyles = {
    label:
      userInput.state.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.state.length > 0 ? styles.input_focus : styles.input_no_focus,
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
      {isLoading && !defaultOption && (
        <Loader containerClassName={styles.loader_container} noPortal={true} />
      )}
      {!isLoading && defaultOption && (
        <div className={styles.info_wrapper}>
          <form className={styles.info_form} onSubmit={handleSubmit}>
            <div className={styles.contact_info_wrapper}>
              <p className={styles.title}>Contact Information</p>
              <div className={styles.float_container}>
                <label htmlFor="email" className={emailStyles.label}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
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
                    name="name"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
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
                    name="lastName"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
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
                  name="address"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
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
                    name="city"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
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
                  <label htmlFor="state" className={stateStyles.label}>
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                    value={userInput.state}
                    className={stateStyles.input}
                    required
                    placeholder="State"
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
                    name="zipCode"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                    value={userInput.zipCode}
                    className={zipCodeStyles.input}
                    required
                    placeholder="Zip Code"
                    disabled={isDisabled}
                  />
                </div>
              </div>
              <div
                className={`${styles.float_container} ${
                  isDisabled ? styles.disabled : ''
                }`}
              >
                <label
                  htmlFor="phoneNumber"
                  className={phoneNumberStyles.label}
                >
                  Phone
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="off"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  value={userInput.phoneNumber}
                  className={phoneNumberStyles.input}
                  required
                  placeholder="Phone"
                  disabled={isDisabled}
                />
              </div>
            </div>
            <div className={styles.form_controls}>
              <Button className={styles.back_link} to="/cart">
                <span>
                  <BiChevronLeft />
                </span>
                Back to cart
              </Button>
              <Button className={styles.button} type="submit">
                Continue to shipping
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
