import { useState, useEffect } from 'react';

import { useCollection } from 'hooks/useCollection';

import Loader from 'components/Loader';

import ProductCard from 'components/ProductCard';

import styles from './index.module.scss';

const AdminCollections = () => {
  const { getCollection } = useCollection();

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getCollection();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  // Agregar filter de categorias para admin
  useEffect(() => {}, []);

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
                  slug={product.slug}
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
