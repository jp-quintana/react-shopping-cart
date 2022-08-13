import styles from './index.module.scss';

const Card = (props) => {
  const { className } = props;

  return <div className={`${styles.card} ${className}`}>{props.children}</div>;
};

export default Card;
