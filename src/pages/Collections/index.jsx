import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCollection } from 'hooks/useCollection';

import Loader from 'components/common/Loader';

import ProductCard from 'components/pages/collections/ProductCard';

import styles from './index.module.scss';

const Collections = () => {
  const navigate = useNavigate();
  const { id: slugId } = useParams();

  const { getCollection } = useCollection();

  const [variants, setVariants] = useState(null);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchVariants = async () => {
      const fetchedVariants = await getCollection();
      setVariants(fetchedVariants);
    };

    fetchVariants();
  }, []);

  useEffect(() => {
    if (variants) {
      let selectedVariants;
      if (slugId === 'products') {
        selectedVariants = variants;
      } else if (
        slugId === 't-shirts' ||
        slugId === 'hoodies-sweatshirts' ||
        slugId === 'accessories'
      ) {
        selectedVariants = variants.filter(
          (variant) => variant.collection === slugId
        );
      } else {
        selectedVariants = null;
      }

      if (selectedVariants) {
        setCollection(selectedVariants);
      } else {
        navigate('/');
      }
    }
  }, [variants, slugId]);

  return (
    <>
      {!collection && <Loader />}
      {collection && (
        <section>
          <div className={`${styles.container} main-container`}>
            {collection.map((productVariant) => (
              <ProductCard
                key={productVariant.variantId}
                model={productVariant.model}
                color={productVariant.color}
                colorDisplay={productVariant.colorDisplay}
                currentPrice={productVariant.currentPrice}
                actualPrice={productVariant.actualPrice}
                type={productVariant.type}
                slug={productVariant.slug}
                imageTop={productVariant.images[0]}
                imageBottom={productVariant.images[1]}
                numberOfVariants={productVariant.numberOfVariants}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Collections;
