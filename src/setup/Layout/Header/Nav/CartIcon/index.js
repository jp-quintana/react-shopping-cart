import { useContext, useEffect, useState } from 'react';

import { BiShoppingBag } from 'react-icons/bi';

import CartContext from 'context/cart-context';

import styles from './index.module.scss';

const CartIcon = () => {
  const { totalAmount } = useContext(CartContext);

  const [bump, setBump] = useState(false);

  let iconStyles = bump ? styles.bump : '';
  let amountStyles = totalAmount === 0 ? styles.no_items : styles.cart_amount;

  useEffect(() => {
    if (totalAmount === 0) {
      return;
    } else {
      setBump(true);
    }

    const timer = setTimeout(() => {
      setBump(false);
    }, 150);
    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount]);

  return (
    <span className={iconStyles}>
      <BiShoppingBag />
      <div className={amountStyles}>
        <div>{totalAmount}</div>
      </div>
    </span>
  );
};

export default CartIcon;
