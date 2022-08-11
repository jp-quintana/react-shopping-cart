import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Product from './Product';

import { DUMMY_PRODUCTS as products } from './data';

const defaultProductState = {
  product: { variants: [] },
  variant: {
    price: { raw: '', html: '' },
    images: [],
    inventoryLevels: [],
  },
  size: '',
};

const productReducer = (state, action) => {
  if (action.type === 'SET_PRODUCT') {
    return { ...state, product: action.product, variant: action.variant };
  }
  if (action.type === 'SET_PRODUCT_VARIANT') {
    return {
      ...state,
      variant: state.product.variants.find(
        (variant) => variant.productId === action.id
      ),
      size: '',
    };
  }
  if (action.type === 'SET_PRODUCT_SIZE') {
    return { ...state, size: action.size };
  }
  return defaultProductState;
};

const ProductContainer = () => {
  const { id: urlId } = useParams();

  const [productState, dispatchProduct] = useReducer(
    productReducer,
    defaultProductState
  );

  useEffect(() => {
    const selectedProduct = products.find((product) =>
      product.variants.some((variant) => variant.url === urlId)
    );

    const selectedVariant = selectedProduct.variants.find(
      (variant) => variant.url === urlId
    );

    dispatchProduct({
      type: 'SET_PRODUCT',
      product: selectedProduct,
      variant: selectedVariant,
    });
  }, []);

  const onSelectVariant = (productId) => {
    if (productId !== productState.variant.productId) {
      dispatchProduct({
        type: 'SET_PRODUCT_VARIANT',
        id: productId,
      });
    }
  };

  const onSelectSize = (selectedSize) => {
    if (selectedSize !== productState.size) {
      dispatchProduct({
        type: 'SET_PRODUCT_SIZE',
        size: selectedSize,
      });
    }
  };

  return (
    <Product
      model={productState.product.modelName}
      variants={productState.product.variants}
      type={productState.variant.type}
      color={productState.variant.color}
      price={productState.variant.price.html}
      images={productState.variant.images}
      inventoryLevels={productState.variant.inventoryLevels}
      size={productState.size}
      onSelectVariant={onSelectVariant}
      onSelectSize={onSelectSize}
    />
  );
};

export default ProductContainer;
