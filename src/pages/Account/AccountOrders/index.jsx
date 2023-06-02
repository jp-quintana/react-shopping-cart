import Order from './Order';

import styles from './index.module.scss';

const AccountOrders = ({ orders }) => {
  return (
    <div className={styles.orders_wrapper}>
      {orders.length === 0 && (
        <h2 className={styles.no_orders}>No placed orders yet</h2>
      )}
      {orders.length > 0 && (
        <>
          <h2 className={styles.title}>Your orders</h2>
          <div className={styles.orders_list}>
            {orders.map((order) => (
              <Order
                key={order.id}
                id={order.id}
                items={order.items}
                date={order.createdAt}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOrders;
