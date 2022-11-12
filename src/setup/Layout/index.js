import { useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import CartModal from 'components/CartModal';

const Layout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCartModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  // TODO: ver si hay una mejor manera de hacer esto
  const pathName = location.pathname.split('/');
  const isCheckout = pathName.includes('checkout');

  return (
    <>
      {isOpen && <CartModal toggleCartModal={toggleCartModal} />}
      {!isCheckout && <Header toggleCartModal={toggleCartModal} />}
      <main>
        <Outlet />
      </main>
      {!isCheckout && <Footer />}
    </>
  );
};

export default Layout;
