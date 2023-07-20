import { useState, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import { FaChevronUp } from 'react-icons/fa';

import ReactSlider from 'react-slider';

import ProductFilterValues from './ProductFilterValues';

import styles from './index.module.scss';
import './sliderStyles.css';

const ProductFilter = ({
  allProducts,
  filterConditions,
  sortByDescription,
  handleFilter,
  handleSortBy,
  handleUpdateFilterConditions,
}) => {
  const [availableFilterOptions, setAvailableFilterOptions] = useState({
    color: [],
    size: [],
    fit: [],
    type: [],
    discount: [],
    price: [],
    sortBy: ['newest', 'price: low-high', 'price: high-low'],
  });
  const [showOption, setShowOption] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let filteredProducts = allProducts;
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

            if (property === 'size') {
              return conditions.some(
                (condition) => product.availableQuantity[condition] > 0
              );
            }
          }
        );
      });
    }

    handleFilter(filteredProducts);
  }, [filterConditions, allProducts]);

  useEffect(() => {
    const availableOptions = allProducts.reduce(
      (result, obj) => {
        for (let key in result) {
          if (key === 'sizes') {
            const newArr = [...result.sizes, ...obj.sizes];
            result[key] = new Set(newArr);
          } else if (key === 'price') {
            result[key].push(obj[key]);
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
        price: [],
      }
    );
    setAvailableFilterOptions((prevState) => ({
      ...prevState,
      color: [...availableOptions.color],
      size: [...availableOptions.sizes],
      fit: [...availableOptions.fit],
      type: [...availableOptions.type],
      discount: [...availableOptions.discount].filter(
        (discount) => discount !== 0
      ),
      minPrice: Math.min(...availableOptions.price),
      maxPrice: Math.max(...availableOptions.price),
    }));
  }, [allProducts]);

  useEffect(() => {
    let timer;

    if (!isHovering && showOption) {
      timer = setTimeout(() => {
        setShowOption(null);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isHovering]);

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

    handleUpdateFilterConditions(updatedFilterConditions);
  };

  const handleResetPriceRange = () => {
    let updatedFilterConditions = { ...filterConditions };

    delete updatedFilterConditions['price'];
    handleUpdateFilterConditions(updatedFilterConditions);
  };

  const handleClearConditions = () => {
    handleUpdateFilterConditions({});
  };

  const handleSortByPick = (value) => {
    handleClearConditions();
    handleSortBy(value);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const isBigScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <>
      {isBigScreen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles.container_b}
        >
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
                  {showOption === 'sortBy' &&
                    availableFilterOptions[showOption]?.map((value) => (
                      <div
                        key={value}
                        onClick={
                          sortByDescription !== value
                            ? () => {
                                handleSortByPick(value);
                              }
                            : undefined
                        }
                        className={`${styles.option_button_value} ${
                          sortByDescription === value
                            ? styles.is_selected
                            : undefined
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  {showOption === 'price' && (
                    <ReactSlider
                      value={
                        filterConditions?.price || [
                          availableFilterOptions.minPrice,
                          availableFilterOptions.maxPrice,
                        ]
                      }
                      min={availableFilterOptions.minPrice}
                      max={availableFilterOptions.maxPrice}
                      className={styles.slider}
                      thumbClassName={styles.thumb}
                      trackClassName="track"
                      defaultValue={[0, 100]}
                      renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                      )}
                      pearling
                      minDistance={1}
                      onAfterChange={(value) =>
                        handleUpdateFilterConditions((prevState) => ({
                          ...prevState,
                          price: value,
                        }))
                      }
                    />
                  )}
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
              onClick={() => handleSelectOption('sortBy')}
              className={`${styles.option} ${
                showOption === 'sort-by' ? styles.is_selected : undefined
              }`}
            >
              <span>Sort By: {sortByDescription}</span>
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
                handleCommonButton={handleCommonButton}
                handleResetPriceRange={handleResetPriceRange}
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
