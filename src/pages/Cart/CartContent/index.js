import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';
import { useInventory } from 'hooks/useInventory';

import CartItem from './CartItem';

import Button from 'common/Button';
import Card from 'common/Card';
import NotificationModal from 'common/NotificationModal';

import { addAllItemsPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartContent = () => {
  const { items } = useCartContext();
  const { addItem, removeItem, deleteItem, isLoading, error } = useCart();
  const { checkInventory } = useInventory();

  const [notificationModal, setNotificationModal] = useState(null);

  useEffect(() => {
    checkInventory(items);
  }, []);

  useEffect(() => {
    if (error) {
      setNotificationModal({ error, details: error.details });
    }
  }, [error]);

  const toggleNotificationModal = () => {
    setNotificationModal(null);
  };

  let content =
    items.length > 0 ? (
      <>
        <Card className={styles.checkout_wrapper}>
          <p className={styles.total}>Total: ${addAllItemsPrice(items)}</p>
          <Link to="/checkout">
            <Button className={styles.checkout_button}>Checkout</Button>
          </Link>
        </Card>
        <div className={styles.content_wrapper}>
          <div className={styles.list_wrapper}>
            {items.map((item) => (
              <CartItem
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
          <aside className={styles.sidebar}>
            <form className={styles.support}>
              <p className={styles.support_title}>Código de descuento</p>
              <input
                className={styles.support_input}
                type="text"
                placeholder="Ingresá tu código"
              />
              <button className={`${styles.support_button} disabled-link`}>
                Agregar
              </button>
            </form>
          </aside>
        </div>
      </>
    ) : (
      <div className={styles.no_products_wrapper}>
        <p className={styles.no_products}>No hay productos en el carrito</p>
        <Link className={styles.products_button} to="/categorias/productos">
          <Button>Agregá productos</Button>
        </Link>
      </div>
    );

  return (
    <>
      {notificationModal && (
        <NotificationModal
          toggleNotificationModal={toggleNotificationModal}
          content={notificationModal}
        />
      )}
      <section>
        <div className={`${styles.container} main-container`}>
          <h1 className={styles.title}>Tu carrito</h1>
          {content}
        </div>
      </section>
    </>
  );
};

export default CartContent;
