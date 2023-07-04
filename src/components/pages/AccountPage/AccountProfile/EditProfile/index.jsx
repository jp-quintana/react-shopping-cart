import { useState, useEffect, useRef } from 'react';

import { useProfile } from 'hooks/useProfile';

import { Loader, Button, Toast, ToastMessage } from 'components/common';

import styles from './index.module.scss';

const EditProfile = ({ close, name, lastName, phoneNumber }) => {
  const { editProfile, isLoading, error } = useProfile();

  const [notify, setNotify] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const nameInput = useRef();
  const lastNameInput = useRef();
  const phoneNumberInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editProfile({
      name: nameInput.current.value,
      lastName: lastNameInput.current.value,
      phoneNumber: phoneNumberInput.current.value,
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
              <h2 className={styles.title}>Edit info</h2>
              <div className={styles.form_inputs_wrapper}>
                <label className={styles.label}>
                  <span>Name:</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    required
                    ref={nameInput}
                    defaultValue={name}
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
                    defaultValue={lastName}
                  />
                </label>
                <label className={styles.label}>
                  <span>Phone:</span>
                  <input
                    className={styles.input}
                    type="tel"
                    ref={phoneNumberInput}
                    defaultValue={phoneNumber ? phoneNumber : ''}
                  />
                </label>
              </div>
            </form>
          </div>
          <div className={styles.button_wrapper}>
            <Button form="form" className={styles.button} type="submit">
              Edit
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
