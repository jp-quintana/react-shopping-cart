import { useReducer, useEffect } from 'react';

import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from 'db/config';

import ProductContext from './product-context';

const initialState = {
  productIsReady: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedSkuId: '',
  selectedSize: '',
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

    default: {
      return state;
    }
  }
};

const ProductProvider = ({ children }) => {
  const { id: slugId } = useParams();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProduct = async () => {
    try {
      const slugArr = slugId.split('-');
      const selectedColor = slugArr.pop();
      const formattedSlug = slugArr.join('-');

      const productsRef = collection(db, 'productsTest2');
      const productQuery = query(
        productsRef,
        where('slug', '==', formattedSlug)
      );

      const productsSnapshot = await getDocs(productQuery);

      const productDoc = productsSnapshot.docs[0];

      const productData = {
        productId: productDoc.id,
        ...productDoc.data(),
      };

      const variantsSkusRef = collection(productDoc.ref, 'variantSkusTest2');

      const variantsSkusQuery = query(variantsSkusRef, orderBy('order'));

      const variantsSkusSnapshot = await getDocs(variantsSkusQuery);

      const variantsSkusData = variantsSkusSnapshot.docs.map(
        (variantsSkuDoc) => ({
          skuId: variantsSkuDoc.id,
          ...variantsSkuDoc.data(),
        })
      );

      const variantsRef = collection(productDoc.ref, 'variantsTest2');

      const variantsSnapshot = await getDocs(variantsRef);

      const variants = [];

      variantsSnapshot.forEach((variantDoc) =>
        variants.push({
          ...variantDoc.data(),
          variantId: variantDoc.id,
          sizes: variantsSkusData.map((sku) => {
            if (sku.variantId === variantDoc.id) {
              return {
                skuId: sku.skuId,
                value: sku.size,
                quantity: sku.quantity,
              };
            }
          }),
        })
      );

      return {
        product: {
          ...productData,
          variants,
        },
        variant: variants.find((variant) => variant.color === selectedColor),
      };
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { product, variant } = await getProduct();

      dispatch({ type: 'SET_PRODUCT', payload: { product, variant } });
    };

    fetchProduct();
  }, [slugId]);

  // TODO: se puede reemplazar con un link condicional en el cart modal (dentro de cartItem). Solo agregarle link al item si el slugId del params no coincide con el slug del product.
  // TODO: update this. Search for "pending..." in vs search
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
