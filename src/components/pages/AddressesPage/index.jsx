import { useState, useEffect } from 'react';

import { BiChevronLeft, BiPlus } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useAddress } from 'hooks/useAddress';

import AddAddress from './AddAddress';
import Address from './Address';

import {
  Button,
  Loader,
  Toast,
  ToastMessage,
  CenterModal,
} from 'components/common';

import styles from './index.module.scss';

const AddressesPage = () => {
  const { addresses } = useAuthContext();
  const { deleteAddress, isLoading, error } = useAddress();

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const defaultAddress = addresses.find((address) => address.isMain);

  const otherAddresses = addresses.filter((address) => !address.isMain);

  useEffect(() => {
    if (error) {
      setToastMessage({ error, message: error.message });
    }
  }, [error]);

  return (
    <>
      <Toast content={toastMessage}>
        {toastMessage && (
          <ToastMessage
            close={() => setToastMessage(null)}
            content={toastMessage}
          />
        )}
      </Toast>
      <CenterModal close={() => setIsOpen(false)} modalClassName={styles.modal}>
        {isOpen && <AddAddress close={() => setIsOpen(false)} />}
      </CenterModal>
      <section>
        <div className={`${styles.container} main-container`}>
          <Button className={styles.back_button} to="/account">
            <span>
              <BiChevronLeft />
            </span>
            Back to account
          </Button>
          <div className={styles.header_wrapper}>
            <p className={styles.title}>Your addresses</p>
            <Button
              className={styles.add_button}
              onClick={() => setIsOpen(true)}
            >
              <span>
                <BiPlus />
              </span>
              Add new address
            </Button>
          </div>

          <div className={styles.addresses_container}>
            {isLoading && <Loader />}
            <>
              {addresses.length === 0 && (
                <h2 className={styles.no_addresses}>No addresses added yet</h2>
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
                      state={defaultAddress.state}
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
                      state={address.state}
                      id={address.id}
                      isMain={address.isMain}
                      displayOrder={address.displayOrder}
                      onDelete={deleteAddress}
                    />
                  ))}
                </div>
              )}
            </>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddressesPage;
