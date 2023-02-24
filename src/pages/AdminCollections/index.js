import { useState, useEffect } from 'react';

import { useCollection } from 'hooks/useCollection';

import Loader from 'components/Loader';

import ProductCard from 'components/ProductCard';

import styles from './index.module.scss';

const AdminCollections = () => {
  const { fetchCollection } = useCollection();

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await fetchCollection();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {}, []);

  console.log(products);

  return (
    <>
      {!products && <Loader />}
      {products && (
        <section>
          <div className={`${styles.container} main-container`}>
            <h1>Admin Products</h1>
            <div className={styles.products_wrapper}>
              {products.map((product) => (
                <ProductCard
                  key={product.variantId}
                  productId={product.productId}
                  model={product.model}
                  color={product.color}
                  colorDisplay={product.colorDisplay}
                  currentPrice={product.currentPrice}
                  actualPrice={product.actualPrice}
                  type={product.type}
                  url={product.url}
                  imageTop={product.images[0].src}
                  imageBottom={product.images[1].src}
                  numberOfVariants={product.numberOfVariants}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminCollections;
