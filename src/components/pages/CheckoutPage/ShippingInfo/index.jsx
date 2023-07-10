import { useState, useEffect } from 'react';

import { BiChevronLeft } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import AddressForm from '../AddressForm';

import { Button, Loader } from 'components/common';

import styles from './index.module.scss';

const ShippingInfo = () => {
  const { addresses } = useAuthContext();
  const { email, shippingAddress } = useCheckoutContext();
  const { submitShippingInfo, isLoading } = useCheckout();

  const options = [...addresses, { label: 'Add new address', value: 'new' }];

  const [isDisabled, setIsDisabled] = useState(false);
  const [defaultOption, setDefaultOption] = useState(null);
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
    let initialOption;

    if (shippingAddress.id) {
      initialOption = options.find(
        (option) => option.value === shippingAddress.id
      );
    }

    if (!initialOption) {
      initialOption = options.find((option) => option.isMain);
    }

    if (!initialOption) {
      setDefaultOption({ label: 'Add new address', value: 'new' });
      setUserInput({
        ...userInput,
        label: 'Add new Address',
        value: 'new',
      });
    } else {
      setDefaultOption(initialOption);
      setUserInput({ ...userInput, ...initialOption });
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

  return (
    <div className={styles.info_container}>
      {(isLoading || !defaultOption) && (
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
              <AddressForm
                userInput={userInput}
                options={options}
                defaultOption={defaultOption}
                isDisabled={isDisabled}
                handleInput={handleInput}
                handleSelectAddress={handleSelectAddress}
              />
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
