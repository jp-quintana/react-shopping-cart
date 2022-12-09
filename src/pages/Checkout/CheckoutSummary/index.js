import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import styles from './index.module.scss';

// TODO: ELIMINAR ESTO
// const shippingAddress = {
//   email: 'juanquintana1996@gmail.com',
//   name: 'Juan',
//   lastName: 'Quintana',
//   address: 'Felix de Amador 1679',
//   city: 'Olivos',
//   province: 'Buenos Aires',
//   zipCode: '1636',
//   phoneNumber: '1132074782',
// };

const CheckoutSummary = () => {
  const { currentStep, email, shippingAddress, shippingOption } =
    useCheckoutContext();
  const { selectStep } = useCheckout();

  let shipping_option;

  if (shippingOption.standard) {
    shipping_option = 'Estandard - $750';
  } else {
    shipping_option = 'Rápido - $1.500';
  }

  if (currentStep === 2)
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contacto</p>
          <p className={styles.content}>{email}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Modificar
          </p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Dirección</p>
          <p className={styles.content}>
            {shippingAddress.address} - {shippingAddress.city},{' '}
            {shippingAddress.zipCode} - {shippingAddress.province}
          </p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Modificar
          </p>
        </li>
      </ul>
    );

  if (currentStep === 3)
    return (
      <ul className={styles.summary_container}>
        <li className={styles.contact_wrapper}>
          <p className={styles.label}>Contacto</p>
          <p className={styles.content}>{email}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 2)}
          >
            Modificar
          </p>
        </li>
        <li className={styles.address_wrapper}>
          <p className={styles.label}>Dirección</p>
          <p className={styles.content}>
            {shippingAddress.address} - {shippingAddress.city},{' '}
            {shippingAddress.zipCode} - {shippingAddress.province}
          </p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 2)}
          >
            Modificar
          </p>
        </li>
        {/* TODO: Agregar contenido */}
        <li className={styles.method}>
          <p className={styles.label}>Envío</p>
          <p className={styles.content}>{shipping_option}</p>
          <p
            className={styles.update}
            onClick={() => selectStep(currentStep - 1)}
          >
            Modificar
          </p>
        </li>
      </ul>
    );
};

export default CheckoutSummary;
