import { useState } from 'react';

import OrderModal from './OrderModal';

import styles from './index.module.scss';

const Order = ({ id, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOrderModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {isOpen && (
        <OrderModal toggleOrderModal={toggleOrderModal} id={id} items={items} />
      )}
      <div className={styles.card} onClick={toggleOrderModal}>
        <h3>Órden {id}</h3>
        {/* TODO: Cambiar fecha */}
        <p className={styles.date}>xx/xx/xx</p>
      </div>
    </>
  );
};

export default Order;
