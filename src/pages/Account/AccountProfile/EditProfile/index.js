import { useState, useEffect, useRef } from 'react';

import { useProfile } from 'hooks/useProfile';
import { useKeyDown } from 'hooks/useKeyDown';

import Loader from 'common/Loader';
import Toast from 'common/Toast';
import ToastMessage from 'common/ToastMessage';

import styles from './index.module.scss';

const EditProfile = ({ toggleEditProfile, name, lastName, phoneNumber }) => {
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
        toggleEditProfile();
      }
    }
  }, [notification]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  useKeyDown(() => {
    toggleEditProfile();
  }, ['Escape']);

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      {isLoading && <Loader noPortal={true} />}
      {!isLoading && (
        <form id="form" className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Editar datos</h2>
          <div className={styles.form_inputs_wrapper}>
            <label className={styles.label}>
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
            <label className={styles.label}>
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
            <label className={styles.label}>
              <span>Teléfono:</span>
              <input
                className={styles.input}
                type="tel"
                ref={phoneNumberInput}
                defaultValue={phoneNumber ? phoneNumber : ''}
              />
            </label>
          </div>
          <div className={styles.button_wrapper}>
            <button form="form" className={styles.button} type="submit">
              Editar
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditProfile;
