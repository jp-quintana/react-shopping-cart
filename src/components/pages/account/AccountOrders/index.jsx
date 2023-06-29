import Order from './Order';

import styles from './index.module.scss';

const AccountOrders = ({ orders }) => {
  console.log(orders[0]);
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
                email={order.email}
                address={order.shippingAddress.address}
                city={order.shippingAddress.city}
                state={order.shippingAddress.state}
                zipCode={order.shippingAddress.zipCode}
                payment="**** **** **** ****"
                shippingOption={order.shippingOption}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOrders;
