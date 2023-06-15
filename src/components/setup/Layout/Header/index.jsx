import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Nav from './Nav';
import NavDrawer from './NavDrawer';
import NavDrawerContent from './NavDrawerContent';

const Header = ({ toggleCartModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  const isBigScreen = useMediaQuery({
    query: '(min-width: 900px)',
  });

  useEffect(() => {
    if (isBigScreen && isOpen) {
      setIsOpen(false);
    }
  }, [isBigScreen]);

  return (
    <header>
      <NavDrawer close={() => setIsOpen(false)}>
        {isOpen && <NavDrawerContent toggleSideNav={toggleSideNav} />}
      </NavDrawer>
      <Nav toggleSideNav={toggleSideNav} toggleCartModal={toggleCartModal} />
    </header>
  );
};

export default Header;
