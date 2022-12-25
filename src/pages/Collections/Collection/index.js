import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useProduct } from 'hooks/useProduct';

import Loader from 'common/Loader';

import ProductCard from './ProductCard';

// import { DUMMY_COLLECTIONS_PRODUCTS as products } from './data';

import styles from './index.module.scss';

const Collection = () => {
  const { getProducts } = useProduct();

  const [products, setProducts] = useState(null);
  const [collection, setCollection] = useState(null);
  const { id: urlId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      let selectedProducts;
      if (urlId !== 'productos') {
        selectedProducts = products.filter(
          (product) => product.collection === urlId
        );
      } else {
        selectedProducts = products;
      }
      setCollection(selectedProducts);
    }
  }, [products, urlId]);

  return (
    <>
      {!collection && <Loader />}
      {collection && (
        <section>
          <div className={`${styles.container} main-container`}>
            {collection.map((product) => (
              <ProductCard
                key={product.id}
                model={product.model}
                color={product.color}
                price={product.price}
                type={product.type}
                url={product.url}
                _imageTop={product.images[0].src}
                _imageBottom={product.images[1].src}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Collection;
