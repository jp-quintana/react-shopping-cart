import { useState } from 'react';

import OrderModal from './OrderModal';

import { formatDate } from 'helpers/format';

import styles from './index.module.scss';

const Order = ({ id, items, date }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOrderModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      {isOpen && (
        <OrderModal
          toggleOrderModal={toggleOrderModal}
          id={id}
          items={items}
          date={date}
        />
      )}
      <div className={styles.card} onClick={toggleOrderModal}>
        <h3>Órden {id}</h3>
        {/* TODO: Cambiar fecha */}
        <p className={styles.date}>{formatDate(date)}</p>
      </div>
    </>
  );
};

export default Order;
