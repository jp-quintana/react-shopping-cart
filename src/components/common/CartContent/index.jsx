import { useState, useEffect } from 'react';

import { CgShoppingBag, CgCheckO } from 'react-icons/cg';

import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';

import CartItem from '../CartItem';

import { Button, Toast, ToastMessage } from 'components/common';

import { addAllItemsPrice, addAllItemsQuantity } from 'helpers/item';

import styles from './index.module.scss';

const CartContent = ({ closeCartModal }) => {
  const { items } = useCartContext();
  const { addItem, removeItem, deleteItem, isLoading, loadingItemId, error } =
    useCart();

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setToastMessage({ error, message: error.message });
    }
  }, [error]);

  const totalQuantity = addAllItemsQuantity(items);

  return (
    <>
      <Toast content={toastMessage}>
        {toastMessage && (
          <ToastMessage
            close={() => setToastMessage(null)}
            content={toastMessage}
          />
        )}
      </Toast>
      {items.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.no_products}>Show your bag some love!</p>
          <Button
            className={`${styles.button} ${styles.empty_button}`}
            to="/collections/products"
            onClick={closeCartModal}
          >
            Shop now
          </Button>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.list_wrapper}>
              <div className={styles.list}>
                {items.map((item) => (
                  <CartItem
                    closeCartModal={closeCartModal}
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
            </div>
          </div>
          <div className={styles.footer_container}>
            <div className={styles.footer_wrapper}>
              <p>
                <span>Total: ${addAllItemsPrice(items)} </span> |{' '}
                {totalQuantity} {+totalQuantity > 1 ? 'items' : 'item'}
              </p>
              <div className={styles.buttons_wrapper}>
                <Button
                  className={`${styles.button} ${styles.cart_button}`}
                  to="/cart"
                  onClick={closeCartModal}
                >
                  Your bag{' '}
                  <span>
                    <CgShoppingBag />
                  </span>
                </Button>
                <Button
                  className={`${styles.button} ${styles.checkout_button}`}
                  to="/checkout"
                  onClick={closeCartModal}
                >
                  Checkout{' '}
                  <span>
                    <CgCheckO />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartContent;
