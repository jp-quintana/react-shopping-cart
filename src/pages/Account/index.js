import { useState, useEffect } from 'react';

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
  const {
    name,
    lastName,
    email,
    phoneNumber,
    addresses: userAddresses,
  } = useAuthContext();

  const { getOrders, isLoading, Error } = useOrder();
  const { logout, error } = useLogout();

  const [orders, setOrders] = useState(null);

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
                <AccountAddresses />
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Account;
