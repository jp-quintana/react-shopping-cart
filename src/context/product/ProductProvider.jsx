import { useReducer, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from 'db/config';

import ProductContext from './product-context';

const initialState = {
  productIsReady: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedSkuId: '',
  selectedSize: '',
  singleSize: null,
};

const productReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLEAR_PRODUCT': {
      return {
        ...initialState,
      };
    }

    case 'SET_PRODUCT': {
      return {
        ...state,
        productIsReady: true,
        selectedProduct: payload.product,
        selectedVariant: payload.variant,
      };
    }

    case 'SELECT_VARIANT': {
      return {
        ...state,
        selectedVariant: payload,
        selectedSkuId: '',
        selectedSize: '',
      };
    }

    case 'SELECT_SIZE': {
      return {
        ...state,
        selectedSkuId: payload.skuId,
        selectedSize: payload.value,
      };
    }

    case 'SINGLE_SIZE': {
      return {
        ...state,
        singleSize: { quantity: payload.quantity },
        selectedSkuId: payload.selectedSkuId,
      };
    }

    default: {
      return state;
    }
  }
};

const ProductProvider = ({ children }) => {
  const { id: slugId } = useParams();

  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProduct = async () => {
    try {
      const slugArr = slugId.split('-');
      const selectedColor = slugArr.pop();
      const formattedSlug = slugArr.join('-');

      const productsRef = collection(db, 'products');
      const productQuery = query(
        productsRef,
        where('slug', '==', formattedSlug)
      );

      const productsSnapshot = await getDocs(productQuery);

      const productDoc = productsSnapshot.docs[0];

      if (productDoc) {
        const variantsRef = collection(productDoc.ref, 'variants');
        const variantCheckQuery = query(
          variantsRef,
          where('color', '==', selectedColor)
        );

        const variantCheckSnapshot = await getDocs(variantCheckQuery);

        if (variantCheckSnapshot.size === 0) {
          return { product: null, variant: null };
        }

        const productData = {
          productId: productDoc.id,
          ...productDoc.data(),
        };

        const skusRef = collection(productDoc.ref, 'skus');

        const skusQuery = query(skusRef, orderBy('order'));

        const skusSnapshot = await getDocs(skusQuery);

        const skusData = skusSnapshot.docs.map((skuDoc) => ({
          skuId: skuDoc.id,
          ...skuDoc.data(),
        }));

        const variantsSnapshot = await getDocs(variantsRef);

        const variants = [];

        variantsSnapshot.forEach((variantDoc) =>
          variants.push({
            ...variantDoc.data(),
            variantId: variantDoc.id,
            sizes: skusData
              .filter((sku) => sku.variantId === variantDoc.id)
              .map((sku) => ({
                skuId: sku.skuId,
                value: sku.size,
                quantity: sku.quantity,
              })),
          })
        );

        const selectedVariant = variants.find(
          (variant) => variant.color === selectedColor
        );

        if (selectedVariant.sizes.length === 1) {
          dispatch({
            type: 'SINGLE_SIZE',
            payload: {
              selectedSkuId: selectedVariant.sizes[0].skuId,
              quantity: selectedVariant.sizes[0].quantity,
            },
          });
        }

        return {
          product: {
            ...productData,
            variants,
          },
          variant: selectedVariant,
        };
      } else {
        return { product: null, variant: null };
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (state.productIsReady) {
      dispatch({ type: 'CLEAR_PRODUCT' });
    }
    const fetchProduct = async () => {
      const { product, variant } = await getProduct();

      dispatch({ type: 'SET_PRODUCT', payload: { product, variant } });
    };

    fetchProduct();
  }, [slugId]);

  console.log('product-context', state);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
