import { useState } from 'react';

import { BiUser, BiEnvelope, BiPhone } from 'react-icons/bi';

import EditProfile from './EditProfile';

import { CenterModal, Button } from 'components/common';

import styles from './index.module.scss';

const AccountProfile = ({ name, email, lastName, phoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEditProfile = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <CenterModal modalClassName={styles.modal} close={() => setIsOpen(false)}>
        {isOpen && (
          <EditProfile
            close={() => setIsOpen(false)}
            name={name}
            lastName={lastName}
            phoneNumber={phoneNumber}
          />
        )}
      </CenterModal>

      <div className={styles.profile_container}>
        <div className={styles.profile_wrapper}>
          <h3 className={styles.profile_title}>Your Info</h3>
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
              {phoneNumber ? phoneNumber : 'No phone added yet'}
            </li>
          </ul>
          <Button className={styles.edit_button} onClick={toggleEditProfile}>
            Edit Info
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountProfile;
