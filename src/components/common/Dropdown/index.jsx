import Select from 'react-select';

const Dropdown = ({
  styles,
  options,
  isSearchable,
  onChange,
  defaultValue,
}) => {
  return (
    <Select
      styles={styles}
      options={options}
      isSearchable={isSearchable}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default Dropdown;
