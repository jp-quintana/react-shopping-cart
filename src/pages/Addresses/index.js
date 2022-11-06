import { useState } from 'react';

import { BiChevronLeft, BiPlus } from 'react-icons/bi';

import AddAddressModal from './AddAddressModal';
import Address from './Address';

import Button from 'common/Button';

import styles from './index.module.scss';

const DUMMY_ADDRESSES = [
  {
    name: 'Juan',
    lastName: 'Quintana',
    phoneNumber: '1132074782',
    address: 'Amador 1679',
    zipCode: '1636',
    city: 'Olivos',
    province: 'Buenos Aires',
    addressNumber: 1,
    isDefault: true,
  },
  {
    name: 'Juan',
    lastName: 'Quintana',
    phoneNumber: '1132074782',
    address: 'Amador 1679',
    zipCode: '1636',
    city: 'Olivos',
    province: 'Buenos Aires',
    addressNumber: 2,
    isDefault: false,
  },
  {
    name: 'Juan',
    lastName: 'Quintana',
    phoneNumber: '1132074782',
    address: 'Amador 1679',
    zipCode: '1636',
    city: 'Olivos',
    province: 'Buenos Aires',
    addressNumber: 3,
    isDefault: false,
  },
  {
    name: 'Juan',
    lastName: 'Quintana',
    phoneNumber: '1132074782',
    address: 'Amador 1679',
    zipCode: '1636',
    city: 'Olivos',
    province: 'Buenos Aires',
    addressNumber: 4,
    isDefault: false,
  },
];

const Addresses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);
  // const [defaultAddress, setDefaultAddress] = useState(_defaultAddress);

  // TODO: Fix
  const notDefaultAddresses = DUMMY_ADDRESSES.filter(
    (address) => !address.isDefault
  );
  const defaultAddress = DUMMY_ADDRESSES.find((address) => !address.isDefault);

  console.log(notDefaultAddresses);

  return (
    <>
      {isOpen && <AddAddressModal />}
      <section>
        <div className={`${styles.container} main-container`}>
          <button className={styles.back_button}>
            <span>
              <BiChevronLeft />
            </span>
            Volver a mi cuenta
          </button>
          <div className={styles.welcome_wrapper}>
            <p className={styles.title}>Mis direcciones</p>
            <Button className={styles.add_button}>
              <span>
                <BiPlus />
              </span>
              Agregar nueva direccion
            </Button>
          </div>
          <div className={styles.addresses_container}>
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
                    zipCode={defaultAddress.zipCode}
                    city={defaultAddress.city}
                    province={defaultAddress.province}
                    addressNumber={defaultAddress.addressNumber}
                    isDefault={defaultAddress.isDefault}
                  />
                )}
                {notDefaultAddresses.map((address) => (
                  <Address
                    key={address.addressNumber}
                    name={address.name}
                    lastName={address.lastName}
                    phoneNumber={address.phoneNumber}
                    zipCode={address.zipCode}
                    city={address.city}
                    province={address.province}
                    addressNumber={address.addressNumber}
                    isDefault={address.isDefault}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Addresses;
