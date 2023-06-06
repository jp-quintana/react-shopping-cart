import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import Nav from './Nav';
import SideNav from './SideNav';

import SideModal from 'components/common/SideModal';

import styles from './index.module.scss';

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
      <SideModal
        toggleModal={toggleSideNav}
        backdropClassName={styles.backdrop}
        modalClassName={styles.side_nav}
      >
        {isOpen && <SideNav toggleSideNav={toggleSideNav} />}
      </SideModal>
      <Nav toggleSideNav={toggleSideNav} toggleCartModal={toggleCartModal} />
    </header>
  );
};

export default Header;
