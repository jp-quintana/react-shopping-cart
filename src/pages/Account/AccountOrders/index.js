import Order from './Order';

import styles from './index.module.scss';

const AccountOrders = ({ orders }) => {
  return (
    <div className={styles.orders_wrapper}>
      {orders.length === 0 && <h2>Todavía no creaste una orden!</h2>}
      {orders.length > 0 && (
        <>
          <h3 className={styles.title}>Tus Ordenes</h3>
          <div className={styles.orders_list}>
            {orders.map((order) => (
              <Order key={order.id} id={order.id} items={order.items} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOrders;
