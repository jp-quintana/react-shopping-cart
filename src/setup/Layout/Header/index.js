import { useState } from 'react';

import Nav from './components/Nav';
import SideNav from './components/SideNav';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <SideNav toggle={toggle} isOpen={isOpen} />
      <Nav toggle={toggle} />
    </header>
  );
};

export default Header;
