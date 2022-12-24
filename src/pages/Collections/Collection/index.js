import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useProduct } from 'hooks/useProduct';

import ProductCard from './ProductCard';

import { DUMMY_COLLECTIONS_PRODUCTS as products } from './data';

import styles from './index.module.scss';

const Collection = () => {
  const { getProducts } = useProduct();

  const [collection, setCollection] = useState(null);
  const { id: urlId } = useParams();

  useEffect(() => {
    let selectedProducts;
    if (urlId !== 'productos') {
      selectedProducts = products.filter(
        (product) => product.collections === urlId
      );
    } else {
      selectedProducts = products;
    }
    getProducts();
    setCollection(selectedProducts);
  }, [urlId]);

  return (
    <section>
      {collection && (
        <div className={`${styles.container} main-container`}>
          {collection.map((product) => (
            <ProductCard
              key={product.id}
              model={product.model}
              color={product.color}
              price={product.price.html}
              type={product.type}
              url={product.url}
              imageTop={product.image_top}
              imageBottom={product.image_bottom}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Collection;
