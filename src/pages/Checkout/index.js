import { useState } from 'react';

import { Link } from 'react-router-dom';

import CheckoutProgression from './CheckoutProgression';
import Info from './Info';
import Shipping from './Shipping';
import Payment from './Payment';
import OrderSummary from './OrderSummary';

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

const progressionSteps = [
  { label: 'Carrito', url: '/carrito' },
  { label: 'Info' },
  { label: 'Envío' },
  { label: 'Pago' },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handlePreviousStep = () => {
    setCurrentStep((prevState) => prevState + 1);
  };

  const handleNextStep = () => {
    setCurrentStep((prevState) => prevState + 1);
  };

  const handleSelectStep = (index) => {
    setCurrentStep(index);
  };

  let infoContent;

  if (progressionSteps[currentStep].label === 'Info') {
    infoContent = <Info handleNextStep={handleNextStep} />;
  }

  if (progressionSteps[currentStep].label === 'Envío') {
    infoContent = (
      <Shipping
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
      />
    );
  }

  if (progressionSteps[currentStep].label === 'Pago') {
    infoContent = (
      <Payment
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
      />
    );
  }

  return (
    <>
      <div className={styles.background}></div>
      <section className={styles.layout}>
        {/* TODO: ver si hay una mejor forma de hacer esto */}
        <div className={`${styles.header} main-container`}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="" />
          </Link>
        </div>
        <div className={`${styles.content_wrapper} main-container`}>
          <div className={styles.info_container}>
            <div className={styles.info_header}>
              <Link to="/">
                <img className={styles.logo} src={logo} alt="" />
              </Link>
            </div>
            <CheckoutProgression
              handleSelectStep={handleSelectStep}
              steps={progressionSteps}
            />
            {infoContent}
          </div>
          <div className={styles.order_summary_container}>
            <OrderSummary />
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;