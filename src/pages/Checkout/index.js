import { useState } from 'react';

import { Link } from 'react-router-dom';

import CheckoutProgression from './CheckoutProgression';
import CheckoutSummary from './CheckoutSummary';
import Info from './Info';
import Shipping from './Shipping';
import Payment from './Payment';
import OrderSummary from './OrderSummary';

import logo from 'assets/images/checkout-logo-nav.png';

import styles from './index.module.scss';

const progressionSteps = [
  { id: 'cart', label: 'Carrito', url: '/carrito' },
  { id: 'info', label: 'Info' },
  { id: 'shipping', label: 'Envío' },
  { id: 'payment', label: 'Pago' },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handlePreviousStep = (currentStep) => {
    setCurrentStep((prevState) => prevState - 1);
  };

  const handleNextStep = (currentStep) => {
    setCurrentStep((prevState) => prevState + 1);
  };

  const handleSelectStep = (index) => {
    setCurrentStep(index);
  };

  let infoContent;

  if (progressionSteps[currentStep].id === 'info') {
    infoContent = <Info handleNextStep={handleNextStep} />;
  }

  if (progressionSteps[currentStep].id === 'shipping') {
    infoContent = (
      <>
        <CheckoutSummary
          id={'shipping'}
          currentStep={currentStep}
          handleSelectStep={handleSelectStep}
        />
        <Shipping
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      </>
    );
  }

  if (progressionSteps[currentStep].id === 'payment') {
    infoContent = (
      <>
        <CheckoutSummary
          id={'payment'}
          currentStep={currentStep}
          handleSelectStep={handleSelectStep}
        />
        <Payment handlePreviousStep={handlePreviousStep} />
      </>
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
              currentStep={currentStep}
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
