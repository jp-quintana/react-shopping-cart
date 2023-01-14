import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Nav from './Nav';
import SideNav from './SideNav';

const Header = ({ toggleCartModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  const isSmallScreen = useMediaQuery({
    query: '(max-width: 900px)',
  });

  useEffect(() => {
    if (!isSmallScreen && isOpen) {
      setIsOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <header>
      {isOpen && <SideNav toggleSideNav={toggleSideNav} />}
      <Nav toggleSideNav={toggleSideNav} toggleCartModal={toggleCartModal} />
    </header>
  );
};

export default Header;
