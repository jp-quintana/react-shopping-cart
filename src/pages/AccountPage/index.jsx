import { useState, useEffect } from 'react';

import { useAuthContext } from 'hooks/useAuthContext';
import { useOrder } from 'hooks/useOrder';
import { useLogout } from 'hooks/useLogout';

import AccountOrders from 'components/pages/account/AccountOrders';
import AccountProfile from 'components/pages/account/AccountProfile';
import AccountAddresses from 'components/pages/account/AccountAddresses';

import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import Toast from 'components/common/Toast';
import ToastMessage from 'components/common/ToastMessage';

import styles from './index.module.scss';

const AccountPage = () => {
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

export default AccountPage;
