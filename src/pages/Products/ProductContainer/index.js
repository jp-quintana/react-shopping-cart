import { useReducer, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import CartContext from 'context/cart-context';

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
};

const productReducer = (state, action) => {
  if (action.type === 'SET_PRODUCT') {
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

  if (action.type === 'SET_PRODUCT_VARIANT') {
    const variant = state.selectedProduct.variants.find(
      (variant) => variant.variantId === action.selectedVariantId
    );

    return {
      ...state,
      selectedVariant: variant,
      selectedSku: '',
      selectedSize: '',
    };
  }

  if (action.type === 'SET_PRODUCT_SIZE') {
    return {
      ...state,
      selectedSku: action.sku,
      selectedSize: action.selectedSize,
    };
  }

  return defaultState;
};

const ProductContainer = () => {
  const { addItem } = useContext(CartContext);

  const { id: urlId } = useParams();

  const [state, dispatch] = useReducer(productReducer, defaultState);

  useEffect(() => {
    dispatch({
      type: 'SET_PRODUCT',
      payload: { products, urlId },
    });
  }, [urlId]);

  const handleSelectVariant = (variantId) => {
    if (variantId !== state.selectedVariant.variantId) {
      dispatch({
        type: 'SET_PRODUCT_VARIANT',
        selectedVariantId: variantId,
      });
    }
  };

  const handleSelectSize = (selectedSize) => {
    const { sku, value } = selectedSize;
    if (value !== state.selctedSize) {
      dispatch({
        type: 'SET_PRODUCT_SIZE',
        sku: sku,
        selectedSize: value,
      });
    }
  };

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
      onSelectVariant={handleSelectVariant}
      onSelectSize={handleSelectSize}
      onAddToCart={addItem}
      dispatch={dispatch}
      selectedVariantId={state.selectedVariant.variantId}
      selectedSku={state.selectedSku}
      selectedSize={state.selectedSize}
    />
  );
};

export default ProductContainer;
