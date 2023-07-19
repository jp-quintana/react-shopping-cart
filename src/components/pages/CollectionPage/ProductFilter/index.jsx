import { useState, useEffect } from 'react';

import moment from 'moment';

import { useMediaQuery } from 'react-responsive';
import { FaChevronUp } from 'react-icons/fa';

// import ProductFilterButton from './ProductFilterButton';
import ProductFilterValues from './ProductFilterValues';

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
  const [showOption, setShowOption] = useState(null);

  // TODO: lift sort by logic to parent component
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    let filteredProducts = allProducts;
    console.log('running');
    if (Object.keys(filterConditions).length > 0) {
      filteredProducts = allProducts.filter((product) => {
        return Object.entries(filterConditions).every(
          ([property, conditions]) => {
            if (
              property === 'color' ||
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
    // if (sortBy === 'newest') {
    //   filteredProducts.sort((a, b) => {
    //     const dateA = moment(a.createdAt);
    //     const dateB = moment(b.createdAt);
    //     return dateB.diff(dateA);
    //   });
    // } else if (sortBy === 'low-high') {
    //   filteredProducts.sort((a, b) => {
    //     return a.price - b.price;
    //   });
    // } else if (sortBy === 'high-low') {
    //   filteredProducts.sort((a, b) => {
    //     return b.price - a.price;
    //   });
    // }

    handleFilter(filteredProducts);
  }, [filterConditions, allProducts]);

  useEffect(() => {
    const availableOptions = allProducts.reduce(
      (result, obj) => {
        for (let key in result) {
          if (key === 'sizes') {
            const newArr = [...result.sizes, ...obj.sizes];
            result[key] = new Set(newArr);
          } else {
            result[key].add(obj[key]);
          }
        }

        return result;
      },
      {
        color: new Set(),
        sizes: new Set(),
        fit: new Set(),
        type: new Set(),
        discount: new Set(),
      }
    );
    setAvailableFilterOptions({
      color: [...availableOptions.color],
      size: [...availableOptions.sizes],
      fit: [...availableOptions.fit],
      type: [...availableOptions.type],
      discount: [...availableOptions.discount].filter(
        (discount) => discount !== 0
      ),
    });
  }, [allProducts]);

  const handleSelectOption = (option) => {
    setShowOption((prevState) => {
      if (prevState === option) {
        return null;
      } else {
        return option;
      }
    });
  };

  const handleCommonButton = (option, value) => {
    let updatedFilterConditions = { ...filterConditions };

    if (!updatedFilterConditions[option]) {
      updatedFilterConditions[option] = [];
      updatedFilterConditions[option].push(value);
    } else {
      if (updatedFilterConditions[option].includes(value)) {
        updatedFilterConditions[option] = updatedFilterConditions[
          option
        ].filter((valueToRemove) => valueToRemove !== value);

        if (updatedFilterConditions[option].length === 0) {
          delete updatedFilterConditions[option];
        }
      } else {
        updatedFilterConditions[option].push(value);
      }
    }

    setFilterConditions(updatedFilterConditions);
  };

  const handleClearConditions = () => {
    setFilterConditions({});
  };

  const isBigScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <>
      {isBigScreen && (
        <div className={styles.container_b}>
          <div
            className={`${styles.option_buttons_container} ${
              showOption ? styles.is_open : undefined
            }`}
          >
            <div className={styles.expandable}>
              <div className={styles.option_buttons_wrapper}>
                <>
                  {(showOption === 'color' ||
                    showOption === 'size' ||
                    showOption === 'fit' ||
                    showOption === 'type' ||
                    showOption === 'discount') &&
                    availableFilterOptions[showOption]?.map((value) => (
                      <div
                        key={value}
                        onClick={() => {
                          handleCommonButton(showOption, value);
                        }}
                        className={`${styles.option_button_value} ${
                          filterConditions[showOption]?.includes(value)
                            ? styles.is_selected
                            : undefined
                        }`}
                      >
                        {showOption === 'color' && (
                          <div
                            style={{
                              height: '15px',
                              width: '15px',
                              backgroundColor: value,
                            }}
                          />
                        )}
                        {showOption === 'discount' ? `-${value}%` : value}
                      </div>
                    ))}
                </>
              </div>
            </div>
          </div>
          <ul
            className={`${styles.options} ${
              showOption ? styles.option_is_selected : undefined
            } ${
              Object.keys(filterConditions).length > 0
                ? styles.value_is_selected
                : undefined
            }`}
          >
            <li
              onClick={() => handleSelectOption('color')}
              className={`${styles.option} ${
                showOption === 'color' ? styles.is_selected : undefined
              }`}
            >
              <span>Color</span>
              <FaChevronUp />
            </li>
            <li
              onClick={() => handleSelectOption('size')}
              className={`${styles.option} ${
                showOption === 'size' ? styles.is_selected : undefined
              }`}
            >
              <span>Size</span>
              <FaChevronUp />
            </li>
            <li
              onClick={() => handleSelectOption('fit')}
              className={`${styles.option} ${
                showOption === 'fit' ? styles.is_selected : undefined
              }`}
            >
              <span>Fit</span>
              <FaChevronUp />
            </li>
            <li
              onClick={() => handleSelectOption('type')}
              className={`${styles.option} ${
                showOption === 'type' ? styles.is_selected : undefined
              }`}
            >
              <span>Type</span>
              <FaChevronUp />
            </li>
            <li
              onClick={() => handleSelectOption('price')}
              className={`${styles.option} ${
                showOption === 'price' ? styles.is_selected : undefined
              }`}
            >
              <span>Price</span>
              <FaChevronUp />
            </li>
            <li
              onClick={() => handleSelectOption('discount')}
              className={`${styles.option} ${
                showOption === 'discount' ? styles.is_selected : undefined
              }`}
            >
              <span>Discount</span>
              <FaChevronUp />
            </li>
            <li
              onClick={() => handleSelectOption('sort-by')}
              className={`${styles.option} ${
                showOption === 'sort-by' ? styles.is_selected : undefined
              }`}
            >
              <span>Sort By: {sortBy}</span>
              <FaChevronUp />
            </li>
          </ul>
          <div
            className={`${styles.option_values_container} ${
              Object.keys(filterConditions).length > 0
                ? styles.is_open
                : undefined
            }`}
          >
            <div className={styles.expandable}>
              <ProductFilterValues
                filterConditions={filterConditions}
                handleClearConditions={handleClearConditions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
