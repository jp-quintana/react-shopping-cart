import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCollection } from 'hooks/useCollection';

import Loader from 'components/common/Loader';

import ProductCard from 'components/pages/collection/ProductCard';

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

  const { getCollection } = useCollection();

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

  console.log(productVariants);

  return (
    <>
      {!productVariants && <Loader />}
      {productVariants && (
        <section>
          <div className={`${styles.container} main-container`}>
            {productVariants.map((productVariant) => (
              <ProductCard
                key={productVariant.id}
                model={productVariant.model}
                color={productVariant.color}
                currentPrice={productVariant.variantPrice}
                actualPrice={productVariant.price}
                type={productVariant.type}
                slug={productVariant.slug + '-' + productVariant.color}
                image={productVariant.images[0]}
                numberOfproductVariants={productVariant.numberOfVariants}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default CollectionPage;
