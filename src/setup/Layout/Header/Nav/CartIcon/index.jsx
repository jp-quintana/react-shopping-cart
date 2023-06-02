import { useEffect, useState } from 'react';

import { CgShoppingBag } from 'react-icons/cg';

import { useCartContext } from 'hooks/useCartContext';

import styles from './index.module.scss';

const CartIcon = () => {
  const { totalAmount } = useCartContext();

  const [bump, setBump] = useState(false);

  let iconStyles = bump
    ? `${styles.bump} ${styles.cart_icon}`
    : styles.cart_icon;
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

  console.log(totalAmount);

  return (
    <div className={iconStyles}>
      <CgShoppingBag />
      <div className={amountStyles}>
        <div>{totalAmount}</div>
      </div>
    </div>
  );
};

export default CartIcon;
