import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCollection } from 'hooks/useCollection';

import Loader from 'components/Loader';

import ProductCard from 'components/ProductCard';

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

  console.log(products);

  return (
    <>
      {!collection && <Loader />}
      {collection && (
        <section>
          <div className={`${styles.container} main-container`}>
            {collection.map((product) => (
              <ProductCard
                key={product.variantId}
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
        </section>
      )}
    </>
  );
};

export default Collections;
