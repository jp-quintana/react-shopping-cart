import { Link } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';

import SideModal from 'common/SideModal';

import styles from './index.module.scss';

const SideNav = ({ toggleSideNav }) => {
  const { isVerified } = useAuthContext();

  return (
    <SideModal toggleModal={toggleSideNav}>
      <div className={styles.container}>
        <ul className={styles.links}>
          <li>
            {isVerified && (
              <Link to="/cuenta" onClick={toggleSideNav}>
                Mi Cuenta
              </Link>
            )}
            {!isVerified && (
              <Link to="/cuenta/login" onClick={toggleSideNav}>
                Login
              </Link>
            )}
          </li>
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
      </div>
    </SideModal>
  );
};

export default SideNav;
