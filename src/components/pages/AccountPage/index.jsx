import { useState, useEffect } from 'react';

import { useAuthContext } from 'hooks/useAuthContext';
import { useOrder } from 'hooks/useOrder';
import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';

import AccountOrders from './AccountOrders';
import AccountProfile from './AccountProfile';
import AccountAddresses from './AccountAddresses';

import { Button, Loader } from 'components/common';

import styles from './index.module.scss';

const AccountPage = () => {
  const { name, lastName, email, phoneNumber } = useAuthContext();
  const { getOrders, error } = useOrder();
  const { logout } = useAuth();
  const { sendToast } = useToast();

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (error) {
      sendToast({ error: true, content: { message: error.message } });
    }
  }, [error]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {!orders && (
        <>
          <div className={styles.loader_section} />
          <Loader />
        </>
      )}
      {orders && (
        <>
          <section>
            <div className={`${styles.container} main-container`}>
              <div className={styles.welcome_wrapper}>
                <p className={styles.greeting}>Welcome back, {name}!</p>
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
        </>
      )}
    </>
  );
};

export default AccountPage;
