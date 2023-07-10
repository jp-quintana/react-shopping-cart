import { useState } from 'react';

import OrderContent from './OrderContent';

import { CenterModal } from 'components/common';

import { formatDate } from 'helpers/format';

import styles from './index.module.scss';

const Order = ({
  id,
  items,
  date,
  email,
  address,
  city,
  state,
  zipCode,
  payment,
  shippingOption,
  shippingCost,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CenterModal modalClassName={styles.modal} close={() => setIsOpen(false)}>
        {isOpen && (
          <OrderContent
            closeModal={() => setIsOpen(false)}
            id={id}
            items={items}
            date={date}
            email={email}
            address={address}
            city={city}
            state={state}
            zipCode={zipCode}
            payment={payment}
            shippingOption={shippingOption}
            shippingCost={shippingCost}
          />
        )}
      </CenterModal>
      <div className={styles.card} onClick={() => setIsOpen(true)}>
        <h3>Order #{id}</h3>
        <p className={styles.date}>{formatDate(date)}</p>
      </div>
    </>
  );
};

export default Order;
