import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { BiUser, BiSearch } from 'react-icons/bi';

import CartContext from 'context/cart-context';

import CartIcon from './CartIcon';

import LogoNav from 'assets/images/logo-nav.png';

import styles from './index.module.scss';

const Navbar = (props) => {
  const { toggle } = props;

  const { totalAmount } = useContext(CartContext);

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
              <CartIcon totalAmount={totalAmount} />
            </Link>
          </li>
          <li className={styles.user_icon}>
            <BiUser />
          </li>
          <li className={styles.mobile_icon}>
            <FaBars onClick={toggle} />
          </li>
        </ul>
      </div>
      <div className={styles.container_bottom}>
        <ul className={styles.links}>
          <li>
            <Link className={styles.link} to="/categorias/remeras">
              Remeras
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/categorias/buzos">
              Buzos
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/categorias/accesorios">
              Accesorios
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
