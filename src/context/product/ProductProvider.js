import { useReducer, useEffect } from 'react';

import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

import ProductContext from './product-context';

const initialState = {
  productIsReady: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedSku: '',
  selectedSize: '',
  // selectedStock: 0,
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
        // selectedStock: 0,
      };
    }
    case 'SELECT_SIZE': {
      return {
        ...state,
        selectedSku: action.payload.id,
        selectedSize: action.payload.value,
        // selectedStock: action.payload.stock,
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

  const getProduct = async () => {
    if (state.productIsReady) {
      dispatch({ type: 'CLEAR_PRODUCT' });
    }

    const productsRef = collection(db, 'products');
    const qProd = query(
      productsRef,
      where('variantSlugs', 'array-contains', urlId)
    );

    let product;

    const productsSnapshot = await getDocs(qProd);
    productsSnapshot.forEach((doc) => {
      product = { id: doc.id, ...doc.data() };
    });

    let inventory = [];

    const inventoryRef = collection(db, 'inventory');

    console.log(product);

    const qInv = query(inventoryRef, where('productId', '==', product.id));
    const inventorySnapshot = await getDocs(qInv);

    inventorySnapshot.forEach((doc) => {
      inventory.push({ id: doc.id, ...doc.data() });
    });

    for (let i = 0; i < product.variants.length; i++) {
      const variantInventoryLevels = [];
      for (const item of product.variants[i].inventoryLevels) {
        const skuInventoryLevel = inventory.find((sku) => sku.id === item.sku);

        variantInventoryLevels.push({ ...item, ...skuInventoryLevel });
      }
      product.variants[i].inventoryLevels = [...variantInventoryLevels];
    }

    const variant = product.variants.find((variant) => variant.slug === urlId);

    return { product, variant };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { product, variant } = await getProduct();

      dispatch({ type: 'SET_PRODUCT', payload: { product, variant } });
    };

    fetchProduct();
  }, [urlId]);

  // TODO: se puede reemplazar con un link condicional en el cart modal (dentro de cartItem). Solo agregarle link al item si el slugId del params no coincide con el slug del product.

  useEffect(() => {
    if (locationState === '/productos') {
      const fetchProduct = async () => {
        const { product, variant } = await getProduct();

        dispatch({ type: 'SET_PRODUCT', payload: { product, variant } });
        navigate('.');
      };

      fetchProduct();
    }
  }, [locationState]);

  console.log('product-context', state);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
