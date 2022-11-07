import { BiUser, BiEnvelope, BiPhone } from 'react-icons/bi';

import styles from './index.module.scss';

const AccountProfile = ({
  name,
  email,
  lastName,
  phoneNumber,
  toggleEditProfile,
}) => {
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_wrapper}>
        <h3 className={styles.profile_title}>Tus datos</h3>
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
            {phoneNumber ? phoneNumber : 'No se agregó un teléfono todavía'}
          </li>
        </ul>
        <button className={styles.edit_button} onClick={toggleEditProfile}>
          Editar Datos
        </button>
      </div>
    </div>
  );
};

export default AccountProfile;
