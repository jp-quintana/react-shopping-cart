import { useReducer, useEffect } from 'react';

import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { doc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

import ProductContext from './product-context';

const initialState = {
  productIsReady: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedSku: '',
  selectedSize: '',
  selectedStock: 0,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_PRODUCT': {
      return {
        ...initialState,
      };
    }
    case 'SET_PRODUCT': {
      return {
        ...state,
        productIsReady: true,
        selectedProduct: action.payload.product,
        selectedVariant: action.payload.variant,
      };
    }
    case 'SELECT_VARIANT': {
      return {
        ...state,
        selectedVariant: action.payload,
        selectedSku: '',
        selectedSize: '',
        selectedStock: 0,
      };
    }
    case 'SELECT_SIZE': {
      return {
        ...state,
        selectedSku: action.payload.id,
        selectedSize: action.payload.value,
        selectedStock: action.payload.stock,
      };
    }
    default: {
      return state;
    }
  }
};

const ProductProvider = ({ children }) => {
  const { id: urlId } = useParams();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    console.log('1', 'running');

    const fetchProduct = async () => {
      if (state.productIsReady) {
        dispatch({ type: 'CLEAR_PRODUCT' });
      }

      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        where('variantUrls', 'array-contains', urlId)
      );

      let product;

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        product = { id: doc.id, ...doc.data() };
      });

      const variant = product.variants.find((variant) => variant.url === urlId);

      // TODO: INVENTORY FETCH LEVELS BASE (path:products/productId/variants)

      dispatch({ type: 'SET_PRODUCT', payload: { product, variant } });
    };

    fetchProduct();
  }, [urlId]);

  // TODO: VER COMO MEJORAR ESTA LOGICA

  useEffect(() => {
    console.log('2', 'running');

    if (locationState === '/productos') {
      console.log('3', 'running');

      const fetchProduct = async () => {
        if (state.productIsReady) {
          dispatch({ type: 'CLEAR_PRODUCT' });
        }

        const productsRef = collection(db, 'products');
        const q = query(
          productsRef,
          where('variantUrls', 'array-contains', urlId)
        );

        let product;

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          product = { id: doc.id, ...doc.data() };
        });

        const variant = product.variants.find(
          (variant) => variant.url === urlId
        );

        dispatch({ type: 'SET_PRODUCT', payload: { product, variant } });
        navigate('.');
      };

      fetchProduct();
    }
  }, [locationState]);

  console.log(state);
  console.log(locationState);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
