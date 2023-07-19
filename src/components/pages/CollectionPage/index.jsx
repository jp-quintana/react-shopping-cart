import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCollection } from 'hooks/useCollection';

import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

import { Loader } from 'components/common';

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

  const { getCollection, isLoading, hasMore, error } = useCollection();

  const firstLoad = useRef(true);
  const [productVariants, setProductVariants] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [sortBy, setSortBy] = useState({
    field: 'createdAt',
    direction: 'asc',
    description: 'newest',
  });

  useEffect(() => {
    setProductVariants(null);
    if (!validSlugs.includes(slugId)) {
      navigate('/');
    }

    const fetchProductVariants = async () => {
      const productVariants = await getCollection({
        collectionName: slugId,
        isNewQuery: true,
      });
      setProductVariants(productVariants);
    };

    fetchProductVariants();
  }, [slugId]);

  const handleFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  // TODO: check to see if this backup is needed

  // useEffect(() => {
  //   if (firstLoad.current) {
  //     firstLoad.current = false;
  //     return;
  //   }

  //   if (filteredProducts.length === 0 && hasMore) {
  //     (async () => {
  //       const moreProductVariants = await getCollection({
  //         collectionName: slugId,
  //       });

  //       setProductVariants(moreProductVariants);
  //     })();
  //   }
  // }, [filteredProducts]);
  // TODO: check to see if this backup is needed

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    window.scrollTo(0, 0);

    // setFilteredProducts(null);
    setProductVariants(null);
    (async () => {
      const productVariants = await getCollection({
        collectionName: slugId,
        isNewQuery: true,
        sortBy,
      });

      setProductVariants(productVariants);
    })();
  }, [sortBy]);

  const observer = useRef();
  const lastProductVariantRef = useCallback(
    (node) => {
      console.log(node);
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          const moreProductVariants = await getCollection({
            collectionName: slugId,
            sortBy,
          });

          setProductVariants((prevState) => [
            ...prevState,
            ...moreProductVariants,
          ]);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  const handleSortBy = (description) => {
    if (description === 'newest') {
      setSortBy({
        field: 'createdAt',
        direction: 'asc',
        description,
      });
    } else if (description === 'price: low-high') {
      setSortBy({
        field: 'price',
        direction: 'asc',
        description,
      });
    } else if (description === 'price: high-low') {
      setSortBy({
        field: 'price',
        direction: 'desc',
        description,
      });
    }
  };

  return (
    <>
      <section className={styles.section}>
        {(!productVariants || !filteredProducts) && <Loader />}
        {productVariants && (
          <>
            {filteredProducts && (
              <div className="main-container">
                <div className={styles.container}>
                  {filteredProducts.map((productVariant, index) => (
                    <div
                      id={productVariant.id}
                      key={productVariant.id}
                      ref={
                        index + 1 === filteredProducts.length
                          ? lastProductVariantRef
                          : undefined
                      }
                    >
                      <ProductCard
                        model={productVariant.model}
                        color={productVariant.color}
                        discount={productVariant.discount}
                        currentPrice={productVariant.variantPrice}
                        actualPrice={productVariant.price}
                        type={productVariant.type}
                        slug={productVariant.slug + '-' + productVariant.color}
                        image={productVariant.images[0]}
                        numberOfVariants={productVariant.numberOfVariants}
                      />
                    </div>
                  ))}
                </div>
                {isLoading && (
                  <div className={styles.loading_more}>Loading</div>
                )}
              </div>
            )}
            <ProductFilter
              allProducts={productVariants}
              handleFilter={handleFilter}
              handleSortBy={handleSortBy}
              sortByDesciption={sortBy.description}
            />
          </>
        )}
      </section>
    </>
  );
};

export default CollectionPage;
