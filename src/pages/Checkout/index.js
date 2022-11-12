import logo from 'assets/images/checkout-logo-nav.png';

import styles from './index.module.scss';

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
              <img className={styles.logo} src={logo} alt="" />
            </div>
          </div>
          <div className={styles.order_summary_container}></div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
