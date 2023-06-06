import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { BiChevronLeft, BiPlus } from 'react-icons/bi';

import { useAuthContext } from 'hooks/useAuthContext';
import { useAddress } from 'hooks/useAddress';

import AddAddress from 'components/pages/addresses/AddAddress';
import Address from 'components/pages/addresses/Address';

import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import Toast from 'components/common/Toast';
import ToastMessage from 'components/common/ToastMessage';
import CenterModal from 'components/common/CenterModal';

import styles from './index.module.scss';

const Addresses = () => {
  const { addresses } = useAuthContext();
  const { deleteAddress, isLoading, error } = useAddress();

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const defaultAddress = addresses.find((address) => address.isMain);

  const otherAddresses = addresses.filter((address) => !address.isMain);

  const toggleAddAddressModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      <CenterModal
        modalClassName={styles.modal}
        toggleModal={toggleAddAddressModal}
      >
        {isOpen && <AddAddress toggleAddAddressModal={toggleAddAddressModal} />}
      </CenterModal>
      <section>
        <div className={`${styles.container} main-container`}>
          <Link className={styles.back_button} to="/account">
            <span>
              <BiChevronLeft />
            </span>
            Back to account
          </Link>
          <div className={styles.header_wrapper}>
            <p className={styles.title}>Your addresses</p>
            <Button
              className={styles.add_button}
              onClick={toggleAddAddressModal}
            >
              <span>
                <BiPlus />
              </span>
              Add new address
            </Button>
          </div>

          <div className={styles.addresses_container}>
            {isLoading && (
              <Loader
                wrapperClassName={styles.loader_wrapper}
                noPortal={true}
              />
            )}
            {!isLoading && (
              <>
                {addresses.length === 0 && (
                  <h2 className={styles.no_addresses}>
                    No addresses added yet
                  </h2>
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
                        displayOrder={address.displayOrder}
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
