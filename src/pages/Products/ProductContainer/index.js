import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Product from './Product';

import { DUMMY_PRODUCTS as products } from './data';

const defaultProductState = {
  selectedProduct: { variants: [] },
  selectedVariant: {
    price: { raw: '', html: '' },
    images: [],
    inventoryLevels: [],
  },
  selectedSize: '',
};

const productReducer = (state, action) => {
  if (action.type === 'SET_PRODUCT') {
    return {
      ...state,
      selectedProduct: action.selectedProduct,
      selectedVariant: action.selectedVariant,
    };
  }
  if (action.type === 'SET_PRODUCT_VARIANT') {
    return {
      ...state,
      selectedVariant: state.selectedProduct.variants.find(
        (variant) => variant.variantId === action.selectedVariantId
      ),
      selectedSize: '',
    };
  }
  if (action.type === 'SET_PRODUCT_SIZE') {
    return { ...state, selectedSize: action.selectedSize };
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
    const product = products.find((product) =>
      product.variants.some((variant) => variant.url === urlId)
    );

    const variant = product.variants.find((variant) => variant.url === urlId);

    dispatchProduct({
      type: 'SET_PRODUCT',
      selectedProduct: product,
      selectedVariant: variant,
    });
  }, []);

  const handleSelectVariant = (variantId) => {
    if (variantId !== productState.selectedVariant.variantId) {
      dispatchProduct({
        type: 'SET_PRODUCT_VARIANT',
        selectedVariantId: variantId,
      });
    }
  };

  const handleSelectSize = (selectedSize) => {
    if (selectedSize !== productState.selctedSize) {
      dispatchProduct({
        type: 'SET_PRODUCT_SIZE',
        selectedSize: selectedSize,
      });
    }
  };

  return (
    <Product
      selectedVariant={productState.selectedVariant}
      selectedSize={productState.selectedSize}
      productName={productState.selectedProduct.productName}
      variants={productState.selectedProduct.variants}
      type={productState.selectedVariant.type}
      color={productState.selectedVariant.color}
      price={productState.selectedVariant.price.html}
      images={productState.selectedVariant.images}
      inventoryLevels={productState.selectedVariant.inventoryLevels}
      onSelectVariant={handleSelectVariant}
      onSelectSize={handleSelectSize}
    />
  );
};

export default ProductContainer;
