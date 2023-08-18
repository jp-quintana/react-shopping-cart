import { useEffect } from 'react';

import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';
import { useInventory } from 'hooks/useInventory';
import { useToast } from 'hooks/useToast';

import { CartItem, Button, Loader } from 'components/common';

import { addAllItemsPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartPage = () => {
  const { items, cartNeedsCheck } = useCartContext();
  const {
    addItem,
    removeItem,
    deleteItem,
    activateCartCheck,
    isLoading,
    loadingItemId,
    error: cartError,
  } = useCart();
  const {
    checkInventory,
    isLoading: isInventoryLoading,
    error: inventoryError,
  } = useInventory();
  const { sendToast } = useToast();

  useEffect(() => {
    if (cartNeedsCheck && items.length > 0) {
      checkInventory(items);
    } else {
      activateCartCheck();
    }
  }, []);

  useEffect(() => {
    if (cartError) {
      sendToast({ error: true, content: { message: cartError.message } });
    }
  }, [cartError]);

  useEffect(() => {
    if (inventoryError) {
      sendToast({ error: true, content: { message: inventoryError.message } });
    }
  }, [inventoryError]);

  let content =
    items.length > 0 ? (
      <>
        <div className={styles.checkout_wrapper}>
          <p className={styles.total}>
            Total: <span>${addAllItemsPrice(items)}</span>
          </p>
          <Button to="/checkout" className={styles.checkout_button}>
            Checkout
          </Button>
        </div>
        <div className={styles.content_wrapper}>
          <div className={styles.list_wrapper}>
            {items.map((item) => (
              <CartItem
                key={item.skuId}
                productId={item.productId}
                variantId={item.variantId}
                skuId={item.skuId}
                model={item.model}
                type={item.type}
                color={item.color}
                size={item.size}
                price={item.price}
                slug={item.slug}
                quantity={item.quantity}
                image={item.image}
                addItem={addItem}
                removeItem={removeItem}
                deleteItem={deleteItem}
                isLoading={isLoading}
                loadingItemId={loadingItemId}
              />
            ))}
          </div>
          <aside className={styles.sidebar}>
            <form className={styles.support}>
              <p className={styles.support_title}>Support Code</p>
              <input
                className={styles.support_input}
                type="text"
                placeholder="Enter code"
              />
              <Button className={`${styles.support_button} disabled-link`}>
                Add
              </Button>
            </form>
          </aside>
        </div>
      </>
    ) : (
      <div className={styles.no_products_wrapper}>
        <p className={styles.no_products}>Show your bag some love!</p>
        <Button className={styles.products_button} to="/collections/products">
          Shop now
        </Button>
      </div>
    );

  return (
    <>
      {isInventoryLoading && <Loader />}
      {!isInventoryLoading && (
        <>
          <section>
            <div className={`${styles.container} main-container`}>
              <h1 className={styles.title}>Your bag</h1>
              {content}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CartPage;
