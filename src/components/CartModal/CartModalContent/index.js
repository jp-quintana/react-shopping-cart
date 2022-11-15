import { Link } from 'react-router-dom';

import { useCartContext } from 'hooks/useCartContext';

import CartItem from 'pages/Cart/CartContent/CartItem';

import Button from 'common/Button';

import { addAllItemsPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartModalContent = ({ toggleCartModal }) => {
  const { items, totalAmount } = useCartContext();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.no_products}>No hay productos en el carrito</p>
        <Link className={styles.button} to="/categorias/productos">
          <Button onClick={toggleCartModal}>Agregá productos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.list_wrapper}>
        {items.map((item) => (
          <CartItem
            toggleCartModal={toggleCartModal}
            key={item.sku}
            item={item}
            name={item.name}
            type={item.type}
            color={item.color}
            size={item.size}
            price={item.price}
            url={item.url}
            amount={item.amount}
            images={item.images}
          />
        ))}
      </div>
      <div className={styles.modal_footer}>
        <p>
          <span>Total: {addAllItemsPrice(items)} </span> | {totalAmount} Items
        </p>
        <Link className={styles.button} to="/carrito">
          <Button onClick={toggleCartModal}>Carrito</Button>
        </Link>
        {items.length === 0 && (
          <Button onClick={toggleCartModal}>Checkout</Button>
        )}
        <Link className={styles.button} to="/checkout">
          <Button onClick={toggleCartModal}>Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartModalContent;
