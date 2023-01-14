import { Link } from 'react-router-dom';

import {
  FaUserCircle,
  FaShippingFast,
  FaQuestionCircle,
  FaSyncAlt,
  FaInfoCircle,
  FaInstagram,
  FaTwitterSquare,
  FaSpotify,
} from 'react-icons/fa';

import { useAuthContext } from 'hooks/useAuthContext';

import SideModal from 'common/SideModal';
import Slideshow from 'common/Slideshow';

import { SLIDES as slides } from './data';

import styles from './index.module.scss';

const SideNav = ({ toggleSideNav }) => {
  const { isVerified, name } = useAuthContext();

  return (
    <SideModal toggleModal={toggleSideNav} className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.links_container}>
          <ul className={styles.links_list}>
            <h2>Productos</h2>
            <li>
              <Link
                to="/categorias/remeras"
                onClick={toggleSideNav}
                className={styles.link}
              >
                Remeras
              </Link>
            </li>
            <li>
              <Link
                to="/categorias/buzos"
                onClick={toggleSideNav}
                className={styles.link}
              >
                Buzos
              </Link>
            </li>
            <li>
              <Link
                to="/categorias/accesorios"
                onClick={toggleSideNav}
                className={styles.link}
              >
                Accesorios
              </Link>
            </li>
          </ul>
          <ul className={styles.links_list}>
            <h2>Colecciones</h2>
            <li>
              <Link
                to="/categorias/productos"
                onClick={toggleSideNav}
                className={styles.link}
              >
                Capsula #001
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.products_container}>
          <Slideshow slides={slides} />
        </div>
        <div className={styles.info_container}>
          {isVerified && (
            <h2 className={styles.title}>Bienvenido devuelta, {name}!</h2>
          )}
          <ul className={styles.links_list}>
            <li>
              <Link
                to={isVerified ? '/cuenta' : '/login'}
                onClick={toggleSideNav}
                className={styles.link}
              >
                <i>
                  <FaUserCircle />
                </i>
                {isVerified ? 'Mi cuenta' : 'Login'}
              </Link>
            </li>
            <li>
              <Link to="/" onClick={toggleSideNav} className={styles.link}>
                <i>
                  <FaQuestionCircle />
                </i>
                Info
              </Link>
            </li>
            <li>
              <Link to="/" onClick={toggleSideNav} className={styles.link}>
                <i>
                  <FaShippingFast />
                </i>
                Envios
              </Link>
            </li>
            <li>
              <Link to="/" onClick={toggleSideNav} className={styles.link}>
                <i>
                  <FaSyncAlt />
                </i>
                Devoluciones
              </Link>
            </li>
            <li>
              <Link to="/" onClick={toggleSideNav} className={styles.link}>
                <i>
                  <FaInfoCircle />
                </i>
                Sobre Nosotros
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.socials_container}>
          <a
            href="https://www.instagram.com/hit.hot.ar/"
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <FaInstagram />
            </i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i>
              <FaTwitterSquare />
            </i>
          </a>
          <a href="https://spotify.com" target="_blank" rel="noreferrer">
            <i>
              <FaSpotify />
            </i>
          </a>
        </div>
      </div>
    </SideModal>
  );
};

export default SideNav;
