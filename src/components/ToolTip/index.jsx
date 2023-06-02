import styles from './index.module.scss';

const ToolTip = ({ children, className }) => {
  return <span className={`${styles.tooltip} ${className}`}>{children}</span>;
};

export default ToolTip;
