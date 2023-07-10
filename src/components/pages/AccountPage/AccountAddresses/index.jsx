import { useAuthContext } from 'hooks/useAuthContext';

import { Button } from 'components/common';

import styles from './index.module.scss';

const AccountAddresses = () => {
  const { addresses } = useAuthContext();

  const defaultAddress = addresses.find((address) => address.isMain);

  const otherAddresses = addresses.filter((address) => !address.isMain);

  return (
    <div className={styles.addresses_container}>
      <div className={styles.addresses_wrapper}>
        <h3 className={styles.addresses_titles}>Your addresses</h3>
        <div className={styles.addresses_list}>
          {addresses.length === 0 && (
            <p className={styles.no_addresses}>No addresses added yet</p>
          )}

          {addresses.length > 0 && (
            <>
              <div className={styles.address_wrapper}>
                <h3 className={styles.title}>Primary address</h3>

                <h4 className={styles.name}>
                  {defaultAddress.name} {defaultAddress.lastName}
                </h4>
                <ul className={styles.info}>
                  <li>{defaultAddress.address}</li>
                  <li>
                    {defaultAddress.city}, {defaultAddress.state}{' '}
                    {defaultAddress.zipCode}
                  </li>
                </ul>
              </div>
              {otherAddresses.map((address) => (
                <div className={styles.address_wrapper} key={address.id}>
                  <h3 className={styles.title}>
                    Address {address.displayOrder}
                  </h3>

                  <h4 className={styles.name}>
                    {address.name} {address.lastName}
                  </h4>
                  <ul className={styles.info}>
                    <li>{address.address}</li>
                    <li>
                      {address.city},{address.state} {address.zipCode}
                    </li>
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
        <Button className={styles.edit_button} to="/account/addresses">
          Edit addresses
        </Button>
      </div>
    </div>
  );
};

export default AccountAddresses;
