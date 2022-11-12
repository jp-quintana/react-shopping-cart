import { Link } from 'react-router-dom';

import CheckoutProgression from './CheckoutProgression';

import styles from './index.module.scss';

import logo from 'assets/images/checkout-logo-nav.png';

const DUMMY_CHECKOUT_SESSION = {
  id: 1,
  email: 'juanquintana1996@gmail.com',
  shippingAddress: {
    id: 1,
    name: 'Juan',
    lastName: 'Quintana',
    address: 'Felix de Amador 1679',
    city: 'Olivos',
    province: 'Buenos Aires',
    zipCode: '1636',
    phoneNumber: '1132074782',
  },
  shippingMethod: {
    standard: true,
    expedited: false,
  },
};

const Checkout = () => {
  return (
    <>
      <div className={styles.background}>
        {/* <img src={checkoutBackground} alt="" /> */}
      </div>
      <section className={styles.layout}>
        <div className={`${styles.content_wrapper} main-container`}>
          <div className={styles.info_container}>
            <div className={styles.info_header}>
              <Link to="/">
                <img className={styles.logo} src={logo} alt="" />
              </Link>
            </div>
            <div className={styles.steps_container}>
              <CheckoutProgression />
            </div>
          </div>
          <div className={styles.order_summary_container}></div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
