import { useState, useEffect, useRef } from 'react';

import { useProfile } from 'hooks/useProfile';

import CenterModal from 'common/CenterModal';
import Loader from 'common/Loader';
import NotificationModal from 'common/NotificationModal';

import styles from './index.module.scss';

const EditProfileModal = ({
  toggleEditProfile,
  name,
  lastName,
  phoneNumber,
}) => {
  const { editProfile, isLoading, error } = useProfile();

  const [notification, setNotification] = useState(false);
  const [notificationModal, setNotificationModal] = useState(null);

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
        setNotificationModal({ error, details: error.details });
        setNotification(false);
      } else {
        toggleEditProfile();
      }
    }
  }, [notification]);

  const toggleNotificationModal = () => {
    setNotificationModal(null);
  };

  console.log(notificationModal);

  return (
    <>
      {notificationModal && (
        <NotificationModal
          toggleNotificationModal={toggleNotificationModal}
          content={notificationModal}
        />
      )}
      {isLoading && <Loader />}
      {!isLoading && (
        <CenterModal toggleModal={toggleEditProfile}>
          <form id="form" className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Editar datos:</h2>
            <div className={styles.form_inputs_wrapper}>
              <label>
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
              <label>
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
              <label>
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
        </CenterModal>
      )}
    </>
  );
};

export default EditProfileModal;
