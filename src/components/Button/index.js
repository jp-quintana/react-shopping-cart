import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const Button = ({ children, form, className, to, type, onClick }) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.button} ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      form={form}
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
