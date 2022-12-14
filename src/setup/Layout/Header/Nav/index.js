import { NavLink, Link } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';

import { FaBars } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';

import CartIcon from './CartIcon';

import LogoNav from 'assets/images/logo-nav.png';

import styles from './index.module.scss';

const Navbar = ({ toggleSideNav, toggleCartModal }) => {
  const { isVerified } = useAuthContext();
  return (
    <nav className={`${styles.nav}`}>
      <div className={styles.container_top}>
        {!isVerified && <Link to="/cuenta/login">Login</Link>}
        {isVerified && <Link to="/cuenta">Mi Cuenta</Link>}
      </div>
      <div className={styles.container_bottom}>
        <Link to="/">
          <img className={styles.logo} src={LogoNav} alt="Logo Nav" />
        </Link>
        <ul className={styles.links}>
          <li>
            <NavLink className={styles.link} to="/categorias/remeras">
              Remeras
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/categorias/buzos">
              Buzos
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/categorias/accesorios">
              Accesorios
            </NavLink>
          </li>
        </ul>
        <ul className={styles.icons_menu}>
          <li className={`${styles.search_icon} disabled-link`}>
            <BiSearch />
          </li>
          <li className={styles.cart_icon} onClick={toggleCartModal}>
            <CartIcon />
          </li>
          <li className={styles.mobile_icon}>
            <FaBars onClick={toggleSideNav} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
