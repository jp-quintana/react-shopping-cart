import { Link } from 'react-router-dom';

import { RiInstagramLine, RiTwitterLine, RiSpotifyLine } from 'react-icons/ri';

import styles from './index.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} main-container`}>
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
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <RiInstagramLine />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <RiTwitterLine />
          </a>
          <a href="https://spotify.com" target="_blank" rel="noreferrer">
            <RiSpotifyLine />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
