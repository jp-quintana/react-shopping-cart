import { useState, useEffect } from 'react';

import { useAuthContext } from 'hooks/useAuthContext';
import { useOrder } from 'hooks/useOrder';
import { useLogout } from 'hooks/useLogout';

import AccountOrders from 'components/account/AccountOrders';
import AccountProfile from 'components/account/AccountProfile';
import AccountAddresses from 'components/account/AccountAddresses';

import Button from 'components/Button';
import Loader from 'components/Loader';
import Toast from 'components/Toast';
import ToastMessage from 'components/ToastMessage';

import styles from './index.module.scss';

const Account = () => {
  const { name, lastName, email, phoneNumber } = useAuthContext();

  const { getOrders, error } = useOrder();
  const { logout } = useLogout();

  const [orders, setOrders] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

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
      setToastMessage({
        error,
        details: 'No se pudieron recuperar las órdenes.',
      });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      {!orders && <Loader />}
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

export default Account;
