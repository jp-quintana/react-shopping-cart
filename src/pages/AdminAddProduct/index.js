import styles from './index.module.scss';

const AdminAddProduct = () => {
  // TODO: CREAR TAG INPUT COMPONENT
  return (
    <section>
      <div className={`${styles.container} main-container`}>
        <h1>Add Product</h1>
        <div className={styles.form_wrapper}>
          <form className={styles.form}>
            <label className={styles.label}>
              <span>Model:</span>
              <input type="text" />
            </label>
            <label className={styles.label}>
              <span>Type:</span>
              <input type="text" />
            </label>
            <label className={styles.label}>
              <span>Collection:</span>
              <select>
                <option value="remeras">remeras</option>
                <option value="buzos">buzos</option>
                <option value="accesorios">accesorios</option>
              </select>
            </label>
            <label className={styles.label}>
              <span>Description:</span>
              <textarea type="text" />
            </label>
            <label className={styles.label}>
              <span>Tags:</span>
              <input type="text" />
            </label>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminAddProduct;
