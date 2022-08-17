import { BiShoppingBag } from 'react-icons/bi';

import styles from './index.module.scss';

const CartIcon = (props) => {
  const { totalAmount } = props;

  let iconStyles = totalAmount === 0 ? styles.no_items : styles.cart_amount;

  return (
    <>
      <BiShoppingBag />
      <div className={iconStyles}>
        <div>{totalAmount}</div>
      </div>
    </>
  );
};

export default CartIcon;
