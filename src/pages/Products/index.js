import Product from './Product';

import { DUMMY_PRODUCTS as products } from './data';

const Products = () => {
  return <Product products={products} />;
};

export default Products;
