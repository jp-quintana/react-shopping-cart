import { Link } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';

import styles from './index.module.scss';

const AccountAddresses = ({}) => {
  const { addresses } = useAuthContext();

  const defaultAddress = addresses.find((address) => address.isMain);

  const otherAddresses = addresses.filter((address) => !address.isMain);

  return (
    <div className={styles.addresses_container}>
      <div className={styles.addresses_wrapper}>
        <h3 className={styles.addresses_titles}>Mis Direcciones</h3>
        <div className={styles.addresses_list}>
          {addresses.length === 0 && <p>Todavía no agregaste una dirección!</p>}

          {addresses.length > 0 && (
            <>
              <div>
                <h3 className={styles.title}>Direccion predeterminada</h3>

                <h4 className={styles.name}>
                  {defaultAddress.name} {defaultAddress.lastName}
                </h4>
                <ul className={styles.info}>
                  <li>{defaultAddress.address}</li>
                  <li>
                    {defaultAddress.city}, {defaultAddress.zipCode}
                  </li>
                  <li>{defaultAddress.province}</li>
                </ul>
              </div>
              {otherAddresses.map((address) => (
                <div key={address.id}>
                  <h3 className={styles.title}>Direccion {address.id}</h3>

                  <h4 className={styles.name}>
                    {address.name} {address.lastName}
                  </h4>
                  <ul className={styles.info}>
                    <li>{address.address}</li>
                    <li>
                      {address.city}, {address.zipCode}
                    </li>
                    <li>{address.province}</li>
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
        <Link className={styles.edit_button} to="/cuenta/direcciones">
          Editar Direcciones
        </Link>
      </div>
    </div>
  );
};

export default AccountAddresses;
