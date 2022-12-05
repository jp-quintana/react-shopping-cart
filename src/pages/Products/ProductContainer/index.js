import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Product from './Product';

import { DUMMY_PRODUCTS as products } from './data';

const defaultState = {
  selectedProduct: { variants: [] },
  selectedVariant: {
    price: { raw: '', html: '' },
    images: [],
    inventoryLevels: [],
  },
  selectedSku: '',
  selectedSize: '',
  selectedStock: 0,
};

const productReducer = (state, action) => {
  if (action.type === 'SELECT_PRODUCT') {
    const product = action.payload.products.find((product) =>
      product.variants.some((variant) => variant.url === action.payload.urlId)
    );

    const variant = product.variants.find(
      (variant) => variant.url === action.payload.urlId
    );

    return {
      ...state,
      selectedProduct: product,
      selectedVariant: variant,
    };
  }

  if (action.type === 'SELECT_PRODUCT_VARIANT') {
    const variant = state.selectedProduct.variants.find(
      (variant) => variant.variantId === action.payload
    );

    return {
      ...state,
      selectedSku: '',
      selectedSize: '',
      selectedVariant: variant,
    };
  }

  if (action.type === 'SELECT_PRODUCT_SIZE') {
    return {
      ...state,
      selectedSku: action.payload.sku,
      selectedSize: action.payload.value,
      selectedStock: action.payload.stock,
    };
  }

  return defaultState;
};

const ProductContainer = () => {
  const { id: urlId } = useParams();

  const [state, dispatch] = useReducer(productReducer, defaultState);

  useEffect(() => {
    dispatch({
      type: 'SELECT_PRODUCT',
      payload: { products, urlId },
    });
  }, [urlId]);

  return (
    <Product
      productName={state.selectedProduct.productName}
      variants={state.selectedProduct.variants}
      type={state.selectedVariant.type}
      color={state.selectedVariant.color}
      price={state.selectedVariant.price}
      url={state.selectedVariant.url}
      images={state.selectedVariant.images}
      inventoryLevels={state.selectedVariant.inventoryLevels}
      dispatch={dispatch}
      selectedVariantId={state.selectedVariant.variantId}
      selectedSku={state.selectedSku}
      selectedSize={state.selectedSize}
      selectedStock={state.selectedStock}
    />
  );
};

export default ProductContainer;
