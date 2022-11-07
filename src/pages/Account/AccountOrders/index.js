import styles from './index.module.scss';

const AccountOrders = ({ orders }) => {
  return (
    <div className={styles.orders_list_wrapper}>
      {orders ? <p>Ordenes</p> : <h2>Todavía no creaste una orden!</h2>}
      {/* Crear order items */}
    </div>
  );
};

export default AccountOrders;
