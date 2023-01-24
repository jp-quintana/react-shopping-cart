import { useState } from 'react';

import OrderContent from './OrderContent';

import CenterModal from 'components/CenterModal';

import { formatDate } from 'helpers/format';

import styles from './index.module.scss';

const Order = ({ id, items, date }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOrderModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <CenterModal toggleModal={toggleOrderModal}>
        {isOpen && (
          <OrderContent
            toggleOrderModal={toggleOrderModal}
            id={id}
            items={items}
            date={date}
          />
        )}
      </CenterModal>
      <div className={styles.card} onClick={toggleOrderModal}>
        <h3>Orden #{id}</h3>
        <p className={styles.date}>{formatDate(date)}</p>
      </div>
    </>
  );
};

export default Order;
