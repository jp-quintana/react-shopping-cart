import { useReducer, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { doc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

import ProductContext from './product-context';

const initialState = {
  selectedProduct: null,
  selectedVariant: null,
  selectedSku: '',
  selectedSize: '',
  selectedStock: 0,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCT': {
      return {
        ...state,
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
        selectedSku: action.payload.sku,
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

  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProduct = async () => {
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

      //TODO: FETCH INVENTORY LEVELS BASE (GETDOCS CON PATH)

      dispatch({ type: 'SET_PRODUCT', payload: { product, variant } });
    };

    fetchProduct();
  }, []);

  console.log(state);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
