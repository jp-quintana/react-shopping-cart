import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import CartModal from 'components/CartModal';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCartModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {isOpen && <CartModal toggleCartModal={toggleCartModal} />}
      <Header toggleCartModal={toggleCartModal} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
