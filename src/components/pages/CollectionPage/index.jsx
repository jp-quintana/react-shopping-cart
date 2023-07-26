import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRedoAlt } from 'react-icons/fa';

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

  const newSlug = useRef(true);
  const [productVariants, setProductVariants] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [filterConditions, setFilterConditions] = useState({});
  const [sortBy, setSortBy] = useState({
    field: 'createdAt',
    direction: 'asc',
    description: 'newest',
  });

  useEffect(() => {
    setProductVariants(null);
    setFilteredProducts(null);
    setFilterConditions({});
    if (!newSlug.current) {
      newSlug.current = true;
      setSortBy({
        field: 'createdAt',
        direction: 'asc',
        description: 'newest',
      });
    }

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

  useEffect(() => {
    if (newSlug.current) {
      newSlug.current = false;
      return;
    }

    window.scrollTo(0, 0);

    setFilteredProducts(null);
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
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          const moreProductVariants = await getCollection({
            collectionName: slugId,
            sortBy,
          });

          setProductVariants((prevState) => {
            if (!prevState) {
              return prevState;
            } else {
              return [...prevState, ...moreProductVariants];
            }
          });
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  const handleUpdateFilterConditions = (value) => {
    setFilterConditions(value);
  };

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
        {(!productVariants || !filteredProducts) && (
          <Loader backdropClassName={styles.backdrop} />
        )}

        {productVariants && (
          <>
            {filteredProducts && (
              <div className="main-container">
                <div className={styles.container}>
                  {filteredProducts.length === 0 && !isLoading && (
                    <>
                      <p className={styles.less_filters_title}>
                        Sorry, no products matched your selection {`:(`}
                      </p>
                      <p className={styles.less_filters_subtitle}>
                        Use fewer filters or
                      </p>
                      <div
                        onClick={() => handleUpdateFilterConditions({})}
                        className={styles.clear_all}
                      >
                        <span>Clear all</span>
                        <FaRedoAlt />
                      </div>
                    </>
                  )}
                  <div className={styles.grid_container}>
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
                          productId={productVariant.productId}
                          variantId={productVariant.variantId}
                          model={productVariant.model}
                          color={productVariant.color}
                          discount={productVariant.discount}
                          currentPrice={productVariant.price}
                          actualPrice={productVariant.actualPrice}
                          type={productVariant.type}
                          slides={productVariant.slides}
                          images={productVariant.images}
                          numberOfVariants={productVariant.numberOfVariants}
                          skus={productVariant.skus}
                          isSoldOut={productVariant.isSoldOut}
                        />
                      </div>
                    ))}
                  </div>
                  {isLoading && (
                    <div className={styles.loading_more}>Loading</div>
                  )}
                </div>
              </div>
            )}
            <ProductFilter
              allProducts={productVariants}
              filterConditions={filterConditions}
              sortByDescription={sortBy.description}
              handleFilter={handleFilter}
              handleSortBy={handleSortBy}
              handleUpdateFilterConditions={handleUpdateFilterConditions}
            />
          </>
        )}
      </section>
    </>
  );
};

export default CollectionPage;
