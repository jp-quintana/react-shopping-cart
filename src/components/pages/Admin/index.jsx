import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const Admin = () => {
  return (
    <section>
      <div className={`${styles.container} main-container`}>
        <h1>Panel</h1>
        <div className={styles.links_wrapper}>
          <Link to="/admin/products">
            <div>Products</div>
          </Link>
          <Link to="/admin/products/add">
            <div>Add Product</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
