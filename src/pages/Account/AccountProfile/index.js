import { useState } from 'react';

import { BiUser, BiEnvelope, BiPhone } from 'react-icons/bi';

import EditProfileModal from './EditProfileModal';

import styles from './index.module.scss';

const AccountProfile = ({ name, email, lastName, phoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEditProfile = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {isOpen && (
        <EditProfileModal
          toggleEditProfile={toggleEditProfile}
          name={name}
          lastName={lastName}
          phoneNumber={phoneNumber}
        />
      )}
      <div className={styles.profile_container}>
        <div className={styles.profile_wrapper}>
          <h3 className={styles.profile_title}>Mis datos</h3>
          <ul className={styles.profile_data}>
            <li>
              <BiUser className={styles.profile_icon} />
              {name} {lastName}
            </li>
            <li>
              <BiEnvelope className={styles.profile_icon} />
              {email}
            </li>
            <li>
              <BiPhone className={styles.profile_icon} />
              {phoneNumber ? phoneNumber : 'Todavía no agregaste un teléfono'}
            </li>
          </ul>
          <button className={styles.edit_button} onClick={toggleEditProfile}>
            Editar Datos
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountProfile;
