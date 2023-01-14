import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';

import CartItem from 'pages/Cart/CartContent/CartItem';

import SideModal from 'common/SideModal';
import Button from 'common/Button';
import NotificationModal from 'common/NotificationModal';

import { addAllItemsPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartModalContent = ({ toggleCartModal }) => {
  const { items, totalAmount } = useCartContext();
  const { addItem, removeItem, deleteItem, isLoading, error } = useCart();

  const [notificationModal, setNotificationModal] = useState(null);

  useEffect(() => {
    if (error) {
      setNotificationModal({ error, details: error.details });
    }
  }, [error]);

  const toggleNotificationModal = () => {
    setNotificationModal(null);
  };

  if (items.length === 0) {
    return (
      <>
        {notificationModal && (
          <NotificationModal
            toggleNotificationModal={toggleNotificationModal}
            content={notificationModal}
          />
        )}
        <SideModal className={styles.modal} toggleModal={toggleCartModal}>
          <div className={styles.empty}>
            <p className={styles.no_products}>No hay productos en el carrito</p>
            <Link
              className={styles.button}
              to="/categorias/productos"
              onClick={toggleCartModal}
            >
              <Button>Agregá productos</Button>
            </Link>
          </div>
        </SideModal>
      </>
    );
  }

  return (
    <>
      {notificationModal && (
        <NotificationModal
          toggleNotificationModal={toggleNotificationModal}
          content={notificationModal}
        />
      )}
      <SideModal className={styles.modal} toggleModal={toggleCartModal}>
        <div className={styles.container}>
          <div className={styles.list_wrapper}>
            <div className={styles.list}>
              {items.map((item) => (
                <CartItem
                  toggleCartModal={toggleCartModal}
                  key={item.id}
                  item={item}
                  model={item.model}
                  type={item.type}
                  color={item.color}
                  size={item.size}
                  price={item.price}
                  url={item.url}
                  amount={item.amount}
                  _thumbnail={item.thumbnail}
                  addItem={addItem}
                  removeItem={removeItem}
                  deleteItem={deleteItem}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
          <div className={styles.footer_container}>
            <div className={styles.footer_wrapper}>
              <p>
                <span>Total: ${addAllItemsPrice(items)} </span> | {totalAmount}{' '}
                Items
              </p>
              <Link
                className={styles.button}
                to="/carrito"
                onClick={toggleCartModal}
              >
                <Button>Carrito</Button>
              </Link>
              <Link
                className={styles.button}
                to="/checkout"
                onClick={toggleCartModal}
              >
                <Button>Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </SideModal>
    </>
  );
};

export default CartModalContent;
