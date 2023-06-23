import { useReducer, useEffect } from 'react';

import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from 'db/config';

import ProductContext from './product-context';

const initialState = {
  productIsReady: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedVariantId: '',
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
        selectedVariantId: '',
        selectedSize: '',
      };
    }

    case 'SELECT_SIZE': {
      return {
        ...state,
        selectedVariantId: payload.id,
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

      const skusRef = collection(productDoc.ref, 'variantSkusTest2');

      const skusQuery = query(skusRef, orderBy('order'));

      const skusSnapshot = await getDocs(skusQuery);

      const skusData = skusSnapshot.docs.map((skuDoc) => ({
        skuId: skuDoc.id,
        ...skuDoc.data(),
      }));

      const variantsRef = collection(productDoc.ref, 'variantsTest2');

      const variantsSnapshot = await getDocs(variantsRef);

      const variants = [];

      variantsSnapshot.forEach((variantDoc) =>
        variants.push({
          ...variantDoc.data(),
          skus: skusData.map((sku) => {
            if (sku.skuId === variantDoc.id) {
              return {
                value: sku.size,
                quantity: sku.quantity,
                variantId: sku.variantId,
              };
            }
          }),
        })
      );

      console.log(variants);

      return {
        product: {
          ...productData,
          variants,
        },
        variant: variants.find((variant) => variant.color === selectedColor),
      };
    } catch (err) {
      console.log(err);
      // setError(err);
      // setIsLoading(false);
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
