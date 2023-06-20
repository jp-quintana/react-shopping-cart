import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCollection } from 'hooks/useCollection';

import Loader from 'components/common/Loader';

import ProductCard from 'components/pages/collections/ProductCard';

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

  const [products, setProducts] = useState(null);

  console.log(slugId);

  useEffect(() => {
    setProducts(null);
    if (!validSlugs.includes(slugId)) {
      navigate('/');
    }

    const fetchProducts = async () => {
      const fetchedProducts = await getCollection({ collectionName: slugId });
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [slugId]);

  console.log(products);

  return (
    <>
      {!products && <Loader />}
      {products && (
        <section>
          <div className={`${styles.container} main-container`}>
            {products.map((product) =>
              product.variants.map((variant) => (
                <ProductCard
                  key={variant.id}
                  model={variant.model}
                  color={variant.color}
                  currentPrice={variant.currentPrice}
                  actualPrice={variant.acutalPrice}
                  type={variant.type}
                  slug={variant.slug + '-' + variant.color}
                  image={variant.images[0]}
                  numberOfVariants={variant.numberOfVariants}
                />
              ))
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default CollectionPage;
