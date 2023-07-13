import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCollection } from 'hooks/useCollection';

import { Loader } from 'components/common';

import ProductCard from './ProductCard';

import styles from './index.module.scss';

const validSlugs = [
  'products',
  't-shirts',
  'hoodies-sweatshirts',
  'accessories',
];

const CollectionPage = () => {
  const navigate = useNavigate();
  const { id: slugId } = useParams();

  const { getCollection, isLoading, error } = useCollection();

  const [productVariants, setProductVariants] = useState(null);

  useEffect(() => {
    setProductVariants(null);
    if (!validSlugs.includes(slugId)) {
      navigate('/');
    }

    const fetchProductVariants = async () => {
      const productVariants = await getCollection({
        collectionName: slugId,
      });
      setProductVariants(productVariants);
    };

    fetchProductVariants();
  }, [slugId]);

  const observer = useRef();
  const lastProductVariantRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log(entries[0]);
        if (entries[0].isIntersecting) {
          console.log('Yes');
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading]
  );

  return (
    <>
      <section className={styles.loader_section}>
        {!productVariants && <Loader />}
        {productVariants && (
          <div className={`${styles.container} main-container`}>
            {productVariants.map((productVariant, index) =>
              index + 1 === productVariants.length ? (
                <div
                  id={productVariant.id}
                  key={productVariant.id}
                  ref={lastProductVariantRef}
                >
                  <ProductCard
                    model={productVariant.model}
                    color={productVariant.color}
                    currentPrice={productVariant.variantPrice}
                    actualPrice={productVariant.price}
                    type={productVariant.type}
                    slug={productVariant.slug + '-' + productVariant.color}
                    image={productVariant.images[0]}
                    numberOfVariants={productVariant.numberOfVariants}
                  />
                </div>
              ) : (
                <ProductCard
                  key={productVariant.id}
                  model={productVariant.model}
                  color={productVariant.color}
                  currentPrice={productVariant.variantPrice}
                  actualPrice={productVariant.price}
                  type={productVariant.type}
                  slug={productVariant.slug + '-' + productVariant.color}
                  image={productVariant.images[0]}
                  numberOfVariants={productVariant.numberOfVariants}
                />
              )
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default CollectionPage;
