import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';
import { useLogout } from 'hooks/useLogout';

import AccountOrders from './AccountOrders';
import AccountProfile from './AccountProfile';
import AccountAddresses from './AccountAddresses';

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

const DUMMY_ORDERS = [
  {
    id: 1,
    items: [
      {
        sku: 'BUZDGNGXX101',
        name: 'De Gira',
        size: 'XXL',
        type: 'Hoodie',
        color: 'negro',
        price: 6400,
        url: 'hoodie-de-gira-negro',
        images: [
          {
            id: 1,
            src: '/static/media/productos-hoodie-de-gira-negro-1.8fffad098b5bdc614a9a.jpg',
          },
          {
            id: 2,
            src: '/static/media/productos-hoodie-de-gira-negro-2.29a271d40a2198e94a10.jpg',
          },
        ],
        amount: 1,
      },
      {
        sku: 'BUZDGBLXX101',
        name: 'De Gira',
        size: 'XXL',
        type: 'Hoodie',
        color: 'blanco',
        price: 6400,
        url: 'hoodie-de-gira-blanco',
        images: [
          {
            id: 1,
            src: '/static/media/productos-hoodie-de-gira-blanco-1.c45a930aa703ff4ac01d.jpg',
          },
          {
            id: 2,
            src: '/static/media/productos-hoodie-de-gira-blanco-2.95d67f362fde416b7ee8.jpg',
          },
        ],
        amount: 1,
      },
      {
        sku: 'REMDGBLXL101',
        name: 'De Gira',
        size: 'XL',
        type: 'Remera',
        color: 'blanca',
        price: 3600,
        url: 'remera-de-gira-blanca',
        images: [
          {
            id: 1,
            src: '/static/media/productos-remera-de-gira-blanca-1.232876fd525afcf39ea3.jpg',
          },
          {
            id: 2,
            src: '/static/media/productos-remera-de-gira-blanca-2.aa04fbd9726d39b1d84d.jpg',
          },
        ],
        amount: 1,
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        sku: 'BUZDGNGXX101',
        name: 'De Gira',
        size: 'XXL',
        type: 'Hoodie',
        color: 'negro',
        price: 6400,
        url: 'hoodie-de-gira-negro',
        images: [
          {
            id: 1,
            src: '/static/media/productos-hoodie-de-gira-negro-1.8fffad098b5bdc614a9a.jpg',
          },
          {
            id: 2,
            src: '/static/media/productos-hoodie-de-gira-negro-2.29a271d40a2198e94a10.jpg',
          },
        ],
        amount: 1,
      },
      {
        sku: 'BUZDGBLXX101',
        name: 'De Gira',
        size: 'XXL',
        type: 'Hoodie',
        color: 'blanco',
        price: 6400,
        url: 'hoodie-de-gira-blanco',
        images: [
          {
            id: 1,
            src: '/static/media/productos-hoodie-de-gira-blanco-1.c45a930aa703ff4ac01d.jpg',
          },
          {
            id: 2,
            src: '/static/media/productos-hoodie-de-gira-blanco-2.95d67f362fde416b7ee8.jpg',
          },
        ],
        amount: 1,
      },
      {
        sku: 'REMDGBLXL101',
        name: 'De Gira',
        size: 'XL',
        type: 'Remera',
        color: 'blanca',
        price: 3600,
        url: 'remera-de-gira-blanca',
        images: [
          {
            id: 1,
            src: '/static/media/productos-remera-de-gira-blanca-1.232876fd525afcf39ea3.jpg',
          },
          {
            id: 2,
            src: '/static/media/productos-remera-de-gira-blanca-2.aa04fbd9726d39b1d84d.jpg',
          },
        ],
        amount: 1,
      },
    ],
  },
];

const Account = () => {
  const navigate = useNavigate();

  const { name, lastName, email, phoneNumber } = useAuthContext();
  const { logout, isLoading, error } = useLogout();

  const [orders, setOrders] = useState(null);

  const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);
  // const [defaultAddress, setDefaultAddress] = useState(_defaultAddress);

  // TODO: Fix
  const notDefaultAddresses = DUMMY_ADDRESSES.filter(
    (address) => !address.isDefault
  );
  const defaultAddress = DUMMY_ADDRESSES.find((address) => address.isDefault);

  const handleLogout = async () => {
    await logout();

    if (!error) {
      navigate('/');
    }
  };

  return (
    <section>
      <div className={`${styles.container} main-container`}>
        <div className={styles.welcome_wrapper}>
          <p className={styles.greeting}>Hola, {name}!</p>
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
            <AccountAddresses
              addresses={addresses}
              defaultAddress={defaultAddress}
              notDefaultAddresses={notDefaultAddresses}
            />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Account;
