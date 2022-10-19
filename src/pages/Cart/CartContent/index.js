import { Link } from 'react-router-dom';

import { useCartContext } from 'hooks/useCartContext';

import CartItem from './CartItem';

import Button from 'common/Button';
import Card from 'common/Card';

import { addCartTotal } from 'helpers/cart';

import styles from './index.module.scss';

const CartContent = () => {
  const { items } = useCartContext();

  let content =
    items.length > 0 ? (
      <>
        <Card className={styles.checkout_wrapper}>
          <p className={styles.total}>Total: ${addCartTotal(items)}</p>
          <Button className={styles.checkout_button}>Checkout</Button>
        </Card>
        <div className={styles.content_wrapper}>
          <div className={styles.list_wrapper}>
            {items.map((item) => (
              <CartItem
                key={item.sku}
                name={item.name}
                type={item.type}
                color={item.color}
                size={item.size}
                price={item.price}
                url={item.url}
                amount={item.amount}
                images={item.images}
                item={item}
              />
            ))}
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
    <section>
      <div className={`${styles.container} main-container`}>
        <h1 className={styles.title}>Tu carrito</h1>
        {content}
      </div>
    </section>
  );
};

export default CartContent;
