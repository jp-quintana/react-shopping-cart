import { useContext } from 'react';

import ProductContext from 'context/product/product-context';

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw Error('useProductContext must be inside ProductProvider');
  }

  return context;
};
