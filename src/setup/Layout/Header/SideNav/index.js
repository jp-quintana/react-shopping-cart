import { Link } from 'react-router-dom';

import { BiX } from 'react-icons/bi';

import styles from './index.module.scss';

const SideNav = ({ toggleSideNav, isOpen }) => {
  return (
    <aside className={!isOpen ? styles.container_hidden : styles.container}>
      <i className={styles.close_icon}>
        <BiX onClick={toggleSideNav} />
      </i>
      <ul className={styles.links}>
        <li>
          <Link to="/categorias/remeras" onClick={toggleSideNav}>
            Remeras
          </Link>
        </li>
        <li>
          <Link to="/categorias/buzos" onClick={toggleSideNav}>
            Buzos
          </Link>
        </li>
        <li>
          <Link to="/categorias/accesorios" onClick={toggleSideNav}>
            Accesorios
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideNav;
