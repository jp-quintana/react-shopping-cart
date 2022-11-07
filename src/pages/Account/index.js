import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';
import { useLogout } from 'hooks/useLogout';

import AccountOrders from './AccountOrders';
import AccountProfile from './AccountProfile';
import AccountAddresses from './AccountAddresses';
import EditProfileModal from './EditProfileModal';

import Button from 'common/Button';

import styles from './index.module.scss';

const DUMMY_ADDRESSES = [
  {
    id: 1,
    name: 'Juan',
    lastName: 'Quintana',
    phoneNumber: '1132074782',
    address: 'Amador 1679',
    zipCode: '1636',
    city: 'Olivos',
    province: 'Buenos Aires',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Juan',
    lastName: 'Quintana',
    phoneNumber: '1132074782',
    address: 'Amador 1679',
    zipCode: '1636',
    city: 'Olivos',
    province: 'Buenos Aires',
    isDefault: false,
  },
  {
    id: 3,
    name: 'Juan',
    lastName: 'Quintana',
    phoneNumber: '1132074782',
    address: 'Amador 1679',
    zipCode: '1636',
    city: 'Olivos',
    province: 'Buenos Aires',
    isDefault: false,
  },
  {
    id: 4,
    name: 'Juan',
    lastName: 'Quintana',
    phoneNumber: '1132074782',
    address: 'Amador 1679',
    zipCode: '1636',
    city: 'Olivos',
    province: 'Buenos Aires',
    isDefault: false,
  },
];

const Account = () => {
  const navigate = useNavigate();

  const { name, lastName, email, phoneNumber } = useAuthContext();
  const { logout, isLoading, error } = useLogout();

  const [orders, setOrders] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);
  // const [defaultAddress, setDefaultAddress] = useState(_defaultAddress);

  // TODO: Fix
  const notDefaultAddresses = DUMMY_ADDRESSES.filter(
    (address) => !address.isDefault
  );
  const defaultAddress = DUMMY_ADDRESSES.find((address) => address.isDefault);

  const handleLogout = async () => {
    await logout();

    if (!error) {
      navigate('/');
    }
  };

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
      <section>
        <div className={`${styles.container} main-container`}>
          <div className={styles.welcome_wrapper}>
            <p className={styles.greeting}>Hola, {name}!</p>
            <Button className={styles.logout_button} onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <div className={styles.content_container}>
            <AccountOrders orders={orders} />
            <aside className={styles.sidebar}>
              <AccountProfile
                name={name}
                lastName={lastName}
                email={email}
                phoneNumber={phoneNumber}
                toggleEditProfile={toggleEditProfile}
              />

              <AccountAddresses
                addresses={addresses}
                defaultAddress={defaultAddress}
                notDefaultAddresses={notDefaultAddresses}
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
