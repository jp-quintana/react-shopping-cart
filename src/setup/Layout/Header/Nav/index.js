import { NavLink, Link } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { BiUser, BiSearch } from 'react-icons/bi';

import CartIcon from './CartIcon';

import LogoNav from 'assets/images/logo-nav.png';

import styles from './index.module.scss';

const Navbar = ({ toggle }) => {
  return (
    <nav className={`${styles.nav}`}>
      <div className={styles.container_top}>
        <Link to="/">
          <img className={styles.logo} src={LogoNav} alt="Logo Nav" />
        </Link>
        <ul className={styles.icons_menu}>
          <li className={styles.search_icon}>
            <BiSearch />
          </li>
          <li className={styles.cart_icon}>
            <Link to="/carrito">
              <CartIcon />
            </Link>
          </li>
          <li>
            <Link to="/cuenta/login" className={styles.user_icon}>
              <BiUser />
            </Link>
          </li>
          <li className={styles.mobile_icon}>
            <FaBars onClick={toggle} />
          </li>
        </ul>
      </div>
      <div className={styles.container_bottom}>
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
      </div>
    </nav>
  );
};

export default Navbar;
