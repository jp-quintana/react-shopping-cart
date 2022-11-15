import React from 'react';

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

const Summary = ({ currentStep }) => {
  if (currentStep === 'shipping')
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contacto</p>
          <p className={styles.content}>{DUMMY_INFO.email}</p>
          <p className={styles.update}>Modificar</p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Dirección</p>
          <p className={styles.content}>
            {DUMMY_INFO.address} - {DUMMY_INFO.city}, {DUMMY_INFO.zipCode} -{' '}
            {DUMMY_INFO.province}
          </p>
          <p className={styles.update}>Modificar</p>
        </li>
      </ul>
    );

  if (currentStep === 'payment')
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contacto</p>
          <p className={styles.content}>{DUMMY_INFO.email}</p>
          <p className={styles.update}>Modificar</p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Dirección</p>
          <p className={styles.content}>
            {DUMMY_INFO.address} - {DUMMY_INFO.city}, {DUMMY_INFO.zipCode} -{' '}
            {DUMMY_INFO.province}
          </p>
          <p className={styles.update}>Modificar</p>
        </li>
        {/* TODO: Agregar contenido */}
        <li className={styles.address_wrapper}>Envío Rápido</li>
      </ul>
    );
};

export default Summary;
