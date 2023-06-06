import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';

import {
  FaExclamationTriangle,
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
import { useKeyDown } from 'hooks/useKeyDown';

import Slider from 'components/common/Slider';

import { SLIDES as slides } from './data';

import styles from './index.module.scss';

const SideNav = ({ toggleSideNav }) => {
  const { isAdmin, isVerified, name } = useAuthContext();

  useKeyDown(() => {
    toggleSideNav();
  }, ['Escape']);

  return (
    <div className={styles.container}>
      <div className={styles.links_container}>
        <ul className={styles.links_list}>
          <h2>Productos</h2>
          <li>
            <Link
              to="/collections/t-shirts"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Remeras
            </Link>
          </li>
          <li>
            <Link
              to="/collections/hoodies-sweatshirts"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Buzos
            </Link>
          </li>
          <li>
            <Link
              to="/collections/accessories"
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
              to="/collections/products"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Capsula #001
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.products_container}>
        <Slider
          slides={slides}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          centeredSlides={true}
          grabCursor={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          sliderClassName={styles.slider}
          imageClassName={styles.image}
        />
      </div>
      <div className={styles.info_container}>
        {isVerified && (
          <h2 className={styles.title}>Bienvenido devuelta, {name}!</h2>
        )}
        <ul className={styles.links_list}>
          {isAdmin && (
            <li>
              <Link to="/admin" onClick={toggleSideNav} className={styles.link}>
                <i>
                  <FaExclamationTriangle />
                </i>
                Admin
              </Link>
            </li>
          )}
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
  );
};

export default SideNav;
