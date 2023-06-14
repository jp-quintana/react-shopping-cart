import { useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import CartContent from 'components/common/CartContent';
import SideModal from 'components/common/SideModal';
import CartModal from 'components/common/CartModal';

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
    <div id="layout">
      {/* <SideModal toggleModal={toggleCartModal}>
        {isOpen && <CartContent toggleCartModal={toggleCartModal} />}
      </SideModal> */}
      <CartModal close={() => setIsOpen(false)}>
        {isOpen && <CartContent toggleCartModal={toggleCartModal} />}
      </CartModal>
      {/* <CartModal show={isOpen} close={() => setIsOpen(false)}>
        <CartContent toggleCartModal={toggleCartModal} />
      </CartModal> */}
      {!isCheckout && <Header toggleCartModal={toggleCartModal} />}
      <main>
        <Outlet />
      </main>
      {!isCheckout && <Footer />}
    </div>
  );
};

export default Layout;
