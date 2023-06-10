import styles from './index.module.scss';

const Card = ({ children, className }) => {
  // TODO: delete

  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
