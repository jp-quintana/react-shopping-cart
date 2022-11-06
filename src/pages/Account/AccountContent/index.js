import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BiUser, BiEnvelope, BiPhone } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useLogout } from 'hooks/useLogout';

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

const AccountContent = () => {
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
            <div className={styles.orders_list_wrapper}>
              {orders ? <p>Ordenes</p> : <h2>Todavía no creaste una orden!</h2>}
              {/* Crear order items */}
            </div>
            <aside className={styles.sidebar}>
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
                      {phoneNumber
                        ? phoneNumber
                        : 'No se agregó un teléfono todavía'}
                    </li>
                  </ul>
                  <button
                    className={styles.edit_button}
                    onClick={toggleEditProfile}
                  >
                    Editar Datos
                  </button>
                </div>
              </div>
              <div className={styles.addresses_container}>
                <div className={styles.addresses_wrapper}>
                  <h3 className={styles.addresses_titles}>Tus Direcciones</h3>
                  <div className={styles.addresses_list}>
                    {addresses.length === 0 && (
                      <p>Todavía no agregaste una dirección!</p>
                    )}

                    {addresses.length > 0 && (
                      <>
                        <div>
                          <h3 className={styles.title}>
                            Direccion predeterminada
                          </h3>

                          <h4 className={styles.name}>
                            {defaultAddress.name} {defaultAddress.lastName}
                          </h4>
                          <ul className={styles.info}>
                            <li>{defaultAddress.address}</li>
                            <li>
                              {defaultAddress.city}, {defaultAddress.zipCode}
                            </li>
                            <li>{defaultAddress.province}</li>
                          </ul>
                        </div>
                        {notDefaultAddresses.map((address) => (
                          <div>
                            <h3 className={styles.title}>
                              Direccion {address.id}
                            </h3>

                            <h4 className={styles.name}>
                              {address.name} {address.lastName}
                            </h4>
                            <ul className={styles.info}>
                              <li>{address.address}</li>
                              <li>
                                {address.city}, {address.zipCode}
                              </li>
                              <li>{address.province}</li>
                            </ul>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <Link className={styles.edit_button} to="/cuenta/direcciones">
                    Editar Direcciones
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountContent;
