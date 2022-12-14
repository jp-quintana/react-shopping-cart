import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';
import { useOrder } from 'hooks/useOrder';
import { useLogout } from 'hooks/useLogout';

import AccountOrders from './AccountOrders';
import AccountProfile from './AccountProfile';
import AccountAddresses from './AccountAddresses';

import Button from 'common/Button';
import Loader from 'common/Loader';

import styles from './index.module.scss';

const Account = () => {
  const navigate = useNavigate();

  const {
    name,
    lastName,
    email,
    phoneNumber,
    addresses: userAddresses,
  } = useAuthContext();

  const { getOrders, isLoading, Error } = useOrder();
  const { logout, error } = useLogout();

  // TODO: CAMBIAR ESTO A NULL
  const [orders, setOrders] = useState(null);

  const [addresses, setAddresses] = useState(userAddresses);
  // const [defaultAddress, setDefaultAddress] = useState(_defaultAddress);

  // if (addresses.length > 0) {

  // }
  const notDefaultAddresses = userAddresses.filter(
    (address) => !address.isDefault
  );
  const defaultAddress = userAddresses.find((address) => address.isDefault);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {!orders && <Loader />}
      {orders && (
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
      )}
    </>
  );
};

export default Account;
