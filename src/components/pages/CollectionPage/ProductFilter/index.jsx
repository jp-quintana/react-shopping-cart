import { useState, useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';
import { FaSlidersH, FaChevronUp } from 'react-icons/fa';

import ReactSlider from 'react-slider';

import ProductFilterValues from './ProductFilterValues';
import { DrawerModal } from 'components/common';

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
  const [conditionsCount, setConditionsCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
              return conditions.some((condition) => {
                return condition === product[property];
              });

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
      price: [
        Math.min(...availableOptions.price),
        Math.max(...availableOptions.price),
      ],
    }));
  }, [allProducts]);

  useEffect(() => {
    let conditionsCount = 0;
    for (const key in filterConditions) {
      conditionsCount += filterConditions[key].length;
    }
    setConditionsCount(conditionsCount);
  }, [filterConditions]);

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

  useEffect(() => {
    if (isBigScreen && modalIsOpen) {
      setModalIsOpen(false);
    }
  }, [isBigScreen]);

  return (
    <>
      <DrawerModal
        motionKey="filter-drawer"
        close={() => setModalIsOpen(false)}
        modalClassName={styles.modal}
      >
        {modalIsOpen && (
          <>
            <div className={styles.modal_header}>
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
                    containerClassName={styles.values_container}
                  />
                </div>
              </div>
              <div
                className={`${styles.input_wrapper} ${
                  Object.keys(filterConditions).length > 0
                    ? styles.is_open
                    : undefined
                }`}
              >
                <input
                  type="text"
                  placeholder="Search products in this collection..."
                  disabled
                />
              </div>
            </div>
            <div className={styles.options_container}>
              {Object.keys(availableFilterOptions).map((option) => (
                <div key={option} className={styles.option_card}>
                  <div className={styles.option_title_wrapper}>
                    <p className={styles.option_title}>{option}</p>
                  </div>
                  <div className={styles.option_buttons_wrapper}>
                    <>
                      {(option === 'color' ||
                        option === 'size' ||
                        option === 'fit' ||
                        option === 'type' ||
                        option === 'discount') &&
                        availableFilterOptions[option]?.map((value) => (
                          <div
                            key={value}
                            onClick={() => {
                              handleCommonButton(option, value);
                            }}
                            className={`${styles.option_button_value} ${
                              filterConditions[option]?.includes(value)
                                ? styles.is_selected
                                : undefined
                            }`}
                          >
                            {option === 'color' && (
                              <div
                                style={{
                                  height: '15px',
                                  width: '15px',
                                  backgroundColor: value,
                                }}
                              />
                            )}
                            {option === 'discount' ? `-${value}%` : value}
                          </div>
                        ))}
                      {option === 'sortBy' &&
                        availableFilterOptions[option]?.map((value) => (
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
                      {option === 'price' && (
                        <ReactSlider
                          value={
                            filterConditions?.price || [
                              availableFilterOptions.price[0],
                              availableFilterOptions.price[1],
                            ]
                          }
                          min={availableFilterOptions.price[0]}
                          max={availableFilterOptions.price[1]}
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
              ))}
            </div>
          </>
        )}
      </DrawerModal>
      {!isBigScreen && (
        <div className={styles.container_s}>
          <div
            onClick={() => setModalIsOpen(true)}
            className={styles.modal_open_button}
          >
            <FaSlidersH />
            {conditionsCount > 0 && (
              <div className={styles.conditions_count}>{conditionsCount}</div>
            )}
          </div>
        </div>
      )}
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
                          availableFilterOptions.price[0],
                          availableFilterOptions.price[1],
                        ]
                      }
                      min={availableFilterOptions.price[0]}
                      max={availableFilterOptions.price[1]}
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
