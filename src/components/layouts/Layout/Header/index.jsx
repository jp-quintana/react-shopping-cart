import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Nav from './Nav';
import { DrawerModal } from 'components/common';
import NavDrawerContent from './NavDrawerContent';

const Header = ({ openCartModal }) => {
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
      <DrawerModal motionKey="nav-drawer" close={() => setIsOpen(false)}>
        {isOpen && <NavDrawerContent toggleSideNav={toggleSideNav} />}
      </DrawerModal>
      <Nav toggleSideNav={toggleSideNav} openCartModal={openCartModal} />
    </header>
  );
};

export default Header;
