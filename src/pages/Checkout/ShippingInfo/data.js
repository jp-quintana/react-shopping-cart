export const reactSelectStyles = {
  option: (baseStyles, { isSelected }) => ({
    ...baseStyles,
    backgroundColor: isSelected ? '#787878 !important' : 'transparent',
    color: 'white',
    cursor: 'pointer',
    fontFamily: 'Inter',
    fontWeight: isSelected ? 'bold' : 'normal',
    letterSpacing: '-0.05rem',
    fontSize: '1.6rem',
    width: '97%',
    borderRadius: '1rem',
    margin: '.5rem auto',
    '&:hover': {
      backgroundColor: '#3c3c3c',
    },
  }),

  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: 'white',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    letterSpacing: '-0.05rem',
    fontSize: '1.6rem',
  }),

  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: '1.5rem 0',
    border: '1px solid #515255',
    borderRadius: '1rem',
    backdropFilter: 'blur(8px)',
    isSelected: true,
  }),

  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#616161',
    '&:hover': {
      backgroundColor: '616161',
    },
  }),

  dropdownIndicator: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    color: isFocused ? 'white' : '#616161',
    '&:hover': {
      color: 'white',
    },
  }),

  control: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '1.5rem 0',
    borderRadius: '1rem',
    cursor: 'pointer',
    boxShadow: 'none',
    border: '1px solid #515255',
    outline: isFocused ? '5px auto -webkit-focus-ring-color' : '',
    '&:hover': {
      border: '1px solid #515255',
    },
  }),
};
