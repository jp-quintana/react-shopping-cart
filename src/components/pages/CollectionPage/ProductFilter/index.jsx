import { useState, useEffect } from 'react';

import moment from 'moment';

import { useMediaQuery } from 'react-responsive';
import { FaChevronUp } from 'react-icons/fa';

import styles from './index.module.scss';

const ProductFilter = ({ allProducts, handleFilter }) => {
  const [filterConditions, setFilterConditions] = useState({});
  const [availableFilterOptions, setAvailableFilterOptions] = useState({
    color: [],
    size: [],
    fit: [],
    type: [],
    discount: [],
  });

  // TODO: lift sort by logic to parent component
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    let filteredProducts = allProducts;
    if (Object.keys(filterConditions).length > 0) {
      filteredProducts = allProducts.filter((product) => {
        return Object.entries(filterConditions).every(
          ([property, conditions]) => {
            if (
              property === 'color' ||
              property === 'size' ||
              property === 'fit' ||
              property === 'type' ||
              property === 'discount'
            )
              return conditions.some(
                (condition) => condition === product[property]
              );

            if (property === 'price') {
              return (
                product.price >= conditions[0] && product.price <= conditions[1]
              );
            }
          }
        );
      });
    }

    // TODO: lift sort by logic to parent component
    if (sortBy === 'newest') {
      filteredProducts.sort((a, b) => {
        const dateA = moment(a.createdAt);
        const dateB = moment(b.createdAt);
        return dateB.diff(dateA);
      });
    } else if (sortBy === 'low-high') {
      filteredProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortBy === 'high-low') {
      filteredProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }

    handleFilter(filteredProducts);
  }, [filterConditions, sortBy, allProducts]);

  useEffect(() => {
    const availableOptions = allProducts.reduce(
      (result, obj) => {
        for (let key in result) {
          result[key].add(obj[key]);
        }

        return result;
      },
      {
        color: new Set(),
        size: new Set(),
        fit: new Set(),
        type: new Set(),
        discount: new Set(),
      }
    );
    setAvailableFilterOptions({
      color: [...availableOptions.color],
      size: [...availableOptions.size],
      fit: [...availableOptions.fit],
      types: [...availableOptions.type],
      discount: [...availableOptions.discount],
    });
  }, [allProducts]);

  console.log(availableFilterOptions);

  const isBigScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <>
      {isBigScreen && (
        <div className={styles.container_b}>
          <ul className={styles.options}>
            <li className={styles.option}>
              <span>Color</span>
              <FaChevronUp />
            </li>
            <li className={styles.option}>
              <span>Size</span>
              <FaChevronUp />
            </li>
            <li className={styles.option}>
              <span>Fit</span>
              <FaChevronUp />
            </li>
            <li className={styles.option}>
              <span>Type</span>
              <FaChevronUp />
            </li>
            <li className={styles.option}>
              <span>Price</span>
              <FaChevronUp />
            </li>
            <li className={styles.option}>
              <span>Discount</span>
              <FaChevronUp />
            </li>
            <li className={styles.option}>
              <span>Sort By: {sortBy}</span>
              <FaChevronUp />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
