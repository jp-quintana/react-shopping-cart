import Step from './Step';

import styles from './index.module.scss';

const progressionSteps = [
  { label: 'Carrito', url: '/carrito' },
  { label: 'Info' },
  { label: 'Envío' },
  { label: 'Pago' },
];

const CheckoutProgression = () => {
  return (
    <div className={styles.steps_container}>
      {progressionSteps.map((step, index) => (
        <Step
          key={step.label}
          label={step.label}
          url={step.url}
          index={index}
        />
      ))}
    </div>
  );
};

export default CheckoutProgression;
