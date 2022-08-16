import Button from 'common/Button';
import Card from 'common/Card';

import CartItem from './CartItem';

import styles from './index.module.scss';

const CartContent = () => {
  return (
    <section>
      <div className={`${styles.container} main-container`}>
        <h1 className={styles.title}>Tu carrito</h1>
        <Card className={styles.checkout_wrapper}>
          <p className={styles.total}>Total: $1.000</p>
          <Button className={styles.checkout_button}>Checkout</Button>
        </Card>
        <div className={styles.content_wrapper}>
          <div className={styles.list_wrapper}>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className={styles.support_wrapper}>
            <form className={styles.support}>
              <p className={styles.support_title}>Código de descuento</p>
              <input
                className={styles.support_input}
                type="text"
                placeholder="Ingresá tu código"
              />
              <button className={styles.support_button}>Agregar</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartContent;
