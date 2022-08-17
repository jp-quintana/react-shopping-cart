import { useReducer, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import CartContext from 'context/cart-context';

import Product from './Product';

import { DUMMY_PRODUCTS as products } from './data';

const defaultProductState = {
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
  return defaultProductState;
};

const ProductContainer = () => {
  const { addItem } = useContext(CartContext);

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
    const { sku, value } = selectedSize;
    if (value !== productState.selctedSize) {
      dispatchProduct({
        type: 'SET_PRODUCT_SIZE',
        sku: sku,
        selectedSize: value,
      });
    }
  };

  return (
    <Product
      selectedVariant={productState.selectedVariant}
      selectedSku={productState.selectedSku}
      selectedSize={productState.selectedSize}
      productName={productState.selectedProduct.productName}
      variants={productState.selectedProduct.variants}
      type={productState.selectedVariant.type}
      color={productState.selectedVariant.color}
      price={productState.selectedVariant.price}
      images={productState.selectedVariant.images}
      inventoryLevels={productState.selectedVariant.inventoryLevels}
      onSelectVariant={handleSelectVariant}
      onSelectSize={handleSelectSize}
      onAddToCart={addItem}
    />
  );
};

export default ProductContainer;
