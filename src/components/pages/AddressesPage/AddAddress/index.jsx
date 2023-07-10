import { useState, useEffect, useRef } from 'react';

import { useAddress } from 'hooks/useAddress';

import { Loader, Button, Toast, ToastMessage } from 'components/common';

import styles from './index.module.scss';

const AddAddress = ({ close }) => {
  const { createAddress, isLoading, error } = useAddress();

  const [isChecked, setIsChecked] = useState(false);
  const [notify, setNotify] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleCheckboxInput = () => {
    setIsChecked((prevState) => !prevState);
  };

  const nameInput = useRef();
  const lastNameInput = useRef();
  const phoneNumberInput = useRef();
  const addressInput = useRef();
  const zipCodeInput = useRef();
  const cityInput = useRef();
  const stateInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAddress({
      name: nameInput.current.value,
      lastName: lastNameInput.current.value,
      phoneNumber: phoneNumberInput.current.value,
      address: addressInput.current.value,
      zipCode: zipCodeInput.current.value,
      city: cityInput.current.value,
      state: stateInput.current.value,
      isMain: isChecked,
    });

    setNotify(true);
  };

  useEffect(() => {
    if (notify) {
      if (error) {
        setToastMessage({ error, message: error.message });
        setNotify(false);
      } else {
        close();
      }
    }
  }, [notify]);

  return (
    <>
      <Toast content={toastMessage}>
        {toastMessage && (
          <ToastMessage
            close={() => setToastMessage(null)}
            content={toastMessage}
          />
        )}
      </Toast>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.form_container}>
          <div className={styles.form_wrapper}>
            <form id="form" className={styles.form} onSubmit={handleSubmit}>
              <h2 className={styles.title}>Add Address:</h2>
              <div className={styles.form_inputs_wrapper}>
                <label className={styles.label}>
                  <span>Name:</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    required
                    ref={nameInput}
                  />
                </label>
                <label className={styles.label}>
                  <span>Last Name:</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Last Name"
                    required
                    ref={lastNameInput}
                  />
                </label>
                <label className={styles.label}>
                  <span>Phone:</span>
                  <input
                    className={styles.input}
                    type="tel"
                    required
                    ref={phoneNumberInput}
                  />
                </label>
                <label className={styles.label}>
                  <span>Address:</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Address"
                    required
                    ref={addressInput}
                  />
                </label>
                <label className={styles.label}>
                  <span>City:</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="City"
                    required
                    ref={cityInput}
                  />
                </label>
                <label className={styles.label}>
                  <span>State</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="State"
                    required
                    ref={stateInput}
                  />
                </label>
                <label className={styles.label}>
                  <span>Zip Code:</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Zip Code"
                    inputMode="nuAddAddressModalmeric"
                    required
                    ref={zipCodeInput}
                  />
                </label>
                <label className={styles.checkbox}>
                  <input
                    className={styles.input}
                    type="checkbox"
                    onChange={handleCheckboxInput}
                  />
                  <div>Primary Address</div>
                </label>
              </div>
            </form>
          </div>
          <div className={styles.button_wrapper}>
            <Button form="form" className={styles.button} type="submit">
              Add
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAddress;
