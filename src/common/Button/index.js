import styles from './index.module.scss';

const Button = ({ children, className, onClick }) => {
  return (
    <div className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
