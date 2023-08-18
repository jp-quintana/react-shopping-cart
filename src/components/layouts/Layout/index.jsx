import { useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import Toast from './Toast';
import Cart from './Cart';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const pathname = location.pathname.split('/');
  const isCheckout = pathname.includes('checkout');

  return (
    <>
      <Toast />
      <div id="layout">
        <Cart
          isCartModalOpen={isCartModalOpen}
          closeCartModal={() => setIsCartModalOpen(false)}
        />
        {!isCheckout && (
          <Header openCartModal={() => setIsCartModalOpen(true)} />
        )}
        <main>
          <Outlet />
        </main>
        {!isCheckout && <Footer />}
      </div>
    </>
  );
};

export default Layout;
