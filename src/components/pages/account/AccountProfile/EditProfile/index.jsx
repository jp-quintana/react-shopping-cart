import { useState, useEffect, useRef } from 'react';

import { useProfile } from 'hooks/useProfile';

import Loader from 'components/common/Loader';
import Button from 'components/common/Button';
import Toast from 'components/common/Toast';
import ToastMessage from 'components/common/ToastMessage';

import styles from './index.module.scss';

const EditProfile = ({ close, name, lastName, phoneNumber }) => {
  const { editProfile, isLoading, error } = useProfile();

  const [notification, setNotification] = useState(false);
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

    setNotification(true);
  };

  useEffect(() => {
    if (notification) {
      if (error) {
        setToastMessage({ error, details: error.details });
        setNotification(false);
      } else {
        close();
      }
    }
  }, [notification]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
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
