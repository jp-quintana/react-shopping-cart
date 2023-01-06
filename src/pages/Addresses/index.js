import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { BiChevronLeft, BiPlus } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useAddress } from 'hooks/useAddress';

import AddAddressModal from './AddAddressModal';
import Address from './Address';

import Button from 'common/Button';
import Loader from 'common/Loader';
import NotificationModal from 'common/NotificationModal';

import styles from './index.module.scss';

const Addresses = () => {
  const { addresses } = useAuthContext();
  const { deleteAddress, isLoading, error } = useAddress();

  const [isOpen, setIsOpen] = useState(false);
  const [notificationModal, setNotificationModal] = useState(null);

  const defaultAddress = addresses.find((address) => address.isMain);

  const otherAddresses = addresses.filter((address) => !address.isMain);

  const toggleAddAddressModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (error) {
      setNotificationModal({ error, details: error.details });
    }
  }, [error]);

  const toggleNotificationModal = () => {
    setNotificationModal(null);
  };

  return (
    <>
      {notificationModal && (
        <NotificationModal
          toggleNotificationModal={toggleNotificationModal}
          content={notificationModal}
        />
      )}
      {isOpen && (
        <AddAddressModal toggleAddAddressModal={toggleAddAddressModal} />
      )}
      <section>
        <div className={`${styles.container} main-container`}>
          <Link className={styles.back_button} to="/cuenta">
            <span>
              <BiChevronLeft />
            </span>
            Volver a mi cuenta
          </Link>
          <div className={styles.header_wrapper}>
            <p className={styles.title}>Mis direcciones</p>
            <Button
              className={styles.add_button}
              onClick={toggleAddAddressModal}
            >
              <span>
                <BiPlus />
              </span>
              Agregar nueva direccion
            </Button>
          </div>

          <div className={styles.addresses_container}>
            {isLoading && (
              <Loader className={styles.loader_wrapper} noPortal={true} />
            )}
            {!isLoading && (
              <>
                {addresses.length === 0 && (
                  <h2>Todavia no agregaste una direccion!</h2>
                )}

                {addresses.length > 0 && (
                  <div className={styles.addresses_list}>
                    {defaultAddress && (
                      <Address
                        name={defaultAddress.name}
                        lastName={defaultAddress.lastName}
                        phoneNumber={defaultAddress.phoneNumber}
                        address={defaultAddress.address}
                        zipCode={defaultAddress.zipCode}
                        city={defaultAddress.city}
                        province={defaultAddress.province}
                        id={defaultAddress.id}
                        isMain={defaultAddress.isMain}
                        onDelete={deleteAddress}
                      />
                    )}
                    {otherAddresses.map((address) => (
                      <Address
                        key={address.id}
                        name={address.name}
                        lastName={address.lastName}
                        phoneNumber={address.phoneNumber}
                        address={address.address}
                        zipCode={address.zipCode}
                        city={address.city}
                        province={address.province}
                        id={address.id}
                        isMain={address.isMain}
                        onDelete={deleteAddress}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Addresses;
