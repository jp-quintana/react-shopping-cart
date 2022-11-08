import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import CenterModal from 'common/CenterModal';

import styles from './index.module.scss';

const EditProfileModal = ({
  toggleEditProfile,
  name,
  lastName,
  phoneNumber,
}) => {
  let navigate = useNavigate();

  // const { signUp, error, isLoading } = useSignUp();
  // TODO: CREAR HOOK PARA EDITAR USER

  const nameInput = useRef();
  const lastNameInput = useRef();
  const phoneNumberInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      name: nameInput.current.value,
      lastName: lastNameInput.current.value,
      phoneNumber: phoneNumberInput.current.value,
    });

    // if (!error) {
    // navigate('/cuenta');
    // }
  };

  return (
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
  );
};

export default EditProfileModal;
