import { useState } from 'react';

import Nav from './Nav';
import SideNav from './SideNav';

const Header = ({ toggleCartModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header>
      <SideNav toggleSideNav={toggleSideNav} isOpen={isOpen} />
      <Nav toggleSideNav={toggleSideNav} toggleCartModal={toggleCartModal} />
    </header>
  );
};

export default Header;
