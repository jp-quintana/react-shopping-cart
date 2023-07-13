import { Link } from 'react-router-dom';

import { useSeed } from 'hooks/useSeed';

import styles from './index.module.scss';

const AdminPage = () => {
  const { uploadProducts } = useSeed();

  return (
    <section>
      <div className={`${styles.container} main-container`}>
        <h1>Panel</h1>
        <div className={styles.options_wrapper}>
          {/* <Link to="/admin/products" className={styles.option}>
            <div>Products</div>
          </Link>
          <Link to="/admin/products/add" className={styles.option}>
            <div>Add Product</div>
          </Link> */}
          <div
            onClick={uploadProducts}
            className={`${styles.option} ${styles.seed}`}
          >
            <div>Seed Data</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
