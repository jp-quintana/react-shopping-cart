import styles from './index.module.scss';

const Button = (props) => {
  const { className, onClick } = props;

  return (
    <div className={`${styles.button} ${className}`} onClick={onClick}>
      {props.children}
    </div>
  );
};

export default Button;
