import { useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import { CartContent, CartModal } from 'components/common';

const Layout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const pathName = location.pathname.split('/');
  const isCheckout = pathName.includes('checkout');

  return (
    <div id="layout">
      <CartModal close={() => setIsOpen(false)}>
        {isOpen && <CartContent closeCartModal={() => setIsOpen(false)} />}
      </CartModal>
      {!isCheckout && <Header openCartModal={() => setIsOpen(true)} />}
      <main>
        <Outlet />
      </main>
      {!isCheckout && <Footer />}
    </div>
  );
};

export default Layout;
