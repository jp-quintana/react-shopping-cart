import { useState } from 'react';

import { Link } from 'react-router-dom';

import { BiChevronLeft, BiPlus } from 'react-icons/bi';

import AddAddressModal from './AddAddressModal';
import Address from './Address';

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

const Addresses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);
  // const [defaultAddress, setDefaultAddress] = useState(_defaultAddress);

  // TODO: Fix
  const notDefaultAddresses = DUMMY_ADDRESSES.filter(
    (address) => !address.isDefault
  );
  const defaultAddress = DUMMY_ADDRESSES.find((address) => address.isDefault);

  return (
    <>
      {isOpen && <AddAddressModal />}
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
                    address={defaultAddress.address}
                    zipCode={defaultAddress.zipCode}
                    city={defaultAddress.city}
                    province={defaultAddress.province}
                    id={defaultAddress.id}
                    isDefault={defaultAddress.isDefault}
                  />
                )}
                {notDefaultAddresses.map((address) => (
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
