import { useState } from 'react';

import { BiChevronLeft, BiPlus } from 'react-icons/bi';

import AddAddressModal from './AddAddressModal';
import Address from './Address';

import Button from 'common/Button';

import styles from './index.module.scss';

const Addresses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  // const addressesContent =

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
                {addresses.map((address) => (
                  <Address />
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
