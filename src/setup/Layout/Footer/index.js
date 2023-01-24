import { Link } from 'react-router-dom';

import { FaInstagram, FaTwitterSquare, FaSpotify } from 'react-icons/fa';

import styles from './index.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.sitemap}>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>Ayuda</h4>
            <ul>
              <li>
                <Link to="/">Contacto</Link>
              </li>
              <li>
                <Link to="/">Pagos & envíos</Link>
              </li>
              <li>
                <Link to="/">Órdenes</Link>
              </li>
              <li>
                <Link to="/">Retornos</Link>
              </li>
            </ul>
          </div>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>Info</h4>
            <ul>
              <li>
                <Link to="">Sobre nosotros</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/hit.hot.ar/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitterSquare />
          </a>
          <a href="https://spotify.com" target="_blank" rel="noreferrer">
            <FaSpotify />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
