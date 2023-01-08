import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCollection } from 'hooks/useCollection';

import Loader from 'common/Loader';

import ProductCard from './ProductCard';

// import { DUMMY_COLLECTIONS_PRODUCTS as products } from './data';

import styles from './index.module.scss';

const Collections = () => {
  const navigate = useNavigate();
  const { id: urlId } = useParams();

  const { getCollection } = useCollection();

  const [products, setProducts] = useState(null);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getCollection();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      let selectedProducts;
      if (urlId === 'productos') {
        selectedProducts = products;
      } else if (
        urlId === 'remeras' ||
        urlId === 'buzos' ||
        urlId === 'accesorios'
      ) {
        selectedProducts = products.filter(
          (product) => product.collection === urlId
        );
      } else {
        selectedProducts = null;
      }

      if (selectedProducts) {
        setCollection(selectedProducts);
      } else {
        navigate('/');
      }
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

export default Collections;
