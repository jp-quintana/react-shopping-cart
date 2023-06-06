import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {
  FaInstagram,
  FaTwitterSquare,
  FaTiktok,
  FaFacebookF,
  FaYoutube,
} from 'react-icons/fa';

import NewsletterSection from './NewsletterSection';

import styles from './index.module.scss';

const Footer = () => {
  const isBigScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <footer className={styles.footer}>
      {!isBigScreen && <NewsletterSection />}
      <div className={styles.container}>
        <div className={styles.sitemap}>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>Help</h4>
            <ul className={styles.nav}>
              <li>
                <Link to="/">Help Center</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Shipping Info</Link>
              </li>
              <li>
                <Link to="/">Track My Order</Link>
              </li>
              <li>
                <Link to="/">Returns & Exchanges</Link>
              </li>
            </ul>
          </div>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>More</h4>
            <ul className={styles.nav}>
              <li>
                <Link to="">About Us</Link>
              </li>
              <li>
                <Link to="">Carreers</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.socials_wrapper}>
          {isBigScreen && <NewsletterSection />}
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitterSquare />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
