import { Link } from 'react-router-dom';

import { BiX } from 'react-icons/bi';

import styles from './index.module.scss';

const SideNav = (props) => {
  const { toggle, isOpen } = props;

  return (
    <aside className={!isOpen ? styles.container_hidden : styles.container}>
      <i className={styles.close_icon}>
        <BiX onClick={toggle} />
      </i>
      <ul className={styles.links}>
        <li>
          <Link to="/categorias/remeras" onClick={toggle}>
            Remeras
          </Link>
        </li>
        <li>
          <Link to="/categorias/buzos" onClick={toggle}>
            Buzos
          </Link>
        </li>
        <li>
          <Link to="/categorias/accesorios" onClick={toggle}>
            Accesorios
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideNav;
