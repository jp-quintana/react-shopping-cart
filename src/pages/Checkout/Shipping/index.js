import styles from './index.module.scss';

const Shipping = () => {
  return (
    <div className={styles.shipping_wrapper}>
      <form className={styles.shipping_form}>
        <div>
          <label>
            <input type="radio" className={styles.radio_unselected} />
            <span>Envio estandard (3 - 5 días)</span>
          </label>
          <p>$750</p>
        </div>
        <div>
          <label>
            <input type="radio" className={styles.radio_unselected} />
            <span>Envio rápido (2 - 3 días)</span>
          </label>
          <p>$1500</p>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
