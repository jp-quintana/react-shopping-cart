import styles from './index.module.scss';

const DUMMY_INFO = {
  email: 'juanquintana1996@gmail.com',
  name: 'Juan',
  lastName: 'Quintana',
  address: 'Felix de Amador 1679',
  city: 'Olivos',
  province: 'Buenos Aires',
  zipCode: '1636',
  phoneNumber: '1132074782',
};

const CheckoutSummary = ({ id, handleSelectStep, currentStep }) => {
  if (id === 'shipping')
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contacto</p>
          <p className={styles.content}>{DUMMY_INFO.email}</p>
          <p
            className={styles.update}
            onClick={() => handleSelectStep(currentStep - 1)}
          >
            Modificar
          </p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Dirección</p>
          <p className={styles.content}>
            {DUMMY_INFO.address} - {DUMMY_INFO.city}, {DUMMY_INFO.zipCode} -{' '}
            {DUMMY_INFO.province}
          </p>
          <p
            className={styles.update}
            onClick={() => handleSelectStep(currentStep - 1)}
          >
            Modificar
          </p>
        </li>
      </ul>
    );

  if (id === 'payment')
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contacto</p>
          <p className={styles.content}>{DUMMY_INFO.email}</p>
          <p
            className={styles.update}
            onClick={() => handleSelectStep(currentStep - 2)}
          >
            Modificar
          </p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Dirección</p>
          <p className={styles.content}>
            {DUMMY_INFO.address} - {DUMMY_INFO.city}, {DUMMY_INFO.zipCode} -{' '}
            {DUMMY_INFO.province}
          </p>
          <p
            className={styles.update}
            onClick={() => handleSelectStep(currentStep - 2)}
          >
            Modificar
          </p>
        </li>
        {/* TODO: Agregar contenido */}
        <li className={styles.method}>
          <p className={styles.label}>Envío</p>
          <p className={styles.content}>Rápido - 1500</p>
          <p
            className={styles.update}
            onClick={() => handleSelectStep(currentStep - 1)}
          >
            Modificar
          </p>
        </li>
      </ul>
    );
};

export default CheckoutSummary;
