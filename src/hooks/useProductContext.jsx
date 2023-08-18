import { useContext } from 'react';

import ProductContext from 'context/product/product-context';

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw Error('useProductContext hook must be used inside ProductProvider');
  }

  return context;
};
