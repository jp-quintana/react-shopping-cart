import { createContext } from 'react';

const ProductContext = createContext({
  productIsReady: false,
  selectedProduct: {},
  selectedVariant: {},
  selectedVariantId: '',
  selectedSize: '',
});

export default ProductContext;
