import { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { doc, getDoc, collection, setDoc } from 'firebase/firestore';
import { db } from 'db/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CartContext from './cart-context';

const initialState = {
  items: [],
  cartIsReady: false,
  cartNeedsCheck: true,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CART_IS_READY': {
      return {
        ...state,
        cartIsReady: true,
      };
    }
    case 'CART_NOT_READY': {
      return {
        ...state,
        cartIsReady: false,
      };
    }
    case 'UPDATE_CART': {
      return {
        ...state,
        items: payload,
        cartIsReady: true,
      };
    }
    case 'DELETE_CART': {
      return {
        ...initialState,
        cartIsReady: true,
      };
    }
    case 'CHECK': {
      return {
        ...state,
        cartNeedsCheck: true,
      };
    }
    case 'NO_CHECK': {
      return {
        ...state,
        cartNeedsCheck: false,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  const location = useLocation();
  const { user, authIsReady } = useAuthContext();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (authIsReady) {
      const getCart = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);
          if (cartDoc.exists()) {
            if (location === '/cart' || '/checkout') {
              dispatch({ type: 'NO_CHECK' });
            }

            const cartData = cartDoc.data();

            let fetchedProductsDocs = {};
            let fetchedVariantsDocs = {};
            let cartNeedsUpdate;

            const cartItemPromises = cartData.items.map(async (item) => {
              const skuRef = doc(
                collection(
                  db,
                  'productsTest2',
                  item.productId,
                  'variantSkusTest2'
                ),
                item.skuId
              );

              const skuDoc = await getDoc(skuRef);

              if (skuDoc.exists()) {
                const skuData = skuDoc.data();

                if (skuData.quantity > 0) {
                  let productData;
                  let variantData;

                  if (!fetchedProductsDocs[item.productId]) {
                    const productRef = doc(db, 'productsTest2', item.productId);
                    const productDoc = await getDoc(productRef);

                    productData = productDoc.data();
                    fetchedProductsDocs[item.productId] = productData;
                  } else {
                    productData = fetchedProductsDocs[item.productId];
                  }

                  if (!fetchedVariantsDocs[item.variantId]) {
                    const variantRef = doc(
                      collection(
                        db,
                        'productsTest2',
                        item.productId,
                        'variantsTest2'
                      ),
                      item.variantId
                    );
                    const variantDoc = await getDoc(variantRef);

                    variantData = variantDoc.data();
                    fetchedVariantsDocs[item.variantId] = variantData;
                  } else {
                    variantData = fetchedVariantsDocs[item.variantId];
                  }

                  return {
                    ...item,
                    size: skuData.size,
                    model: productData.model,
                    type: productData.type,
                    color: variantData.color,
                    price: variantData.variantPrice,
                    slug: productData.slug + '-' + variantData.color,
                    image: variantData.images[0].src,
                  };
                } else {
                  cartNeedsUpdate = true;
                  return null;
                }
              } else {
                cartNeedsUpdate = true;
                return null;
              }
            });

            let populatedCartItems = await Promise.all(cartItemPromises);

            if (cartNeedsUpdate) {
              populatedCartItems = populatedCartItems.filter(
                (item) => item !== null
              );

              const updatedItemsDb = populatedCartItems.map((item) => ({
                skuId: item.skuId,
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
              }));

              await setDoc(cartRef, {
                items: updatedItemsDb,
              });
            }

            dispatch({
              type: 'UPDATE_CART',
              payload: populatedCartItems,
            });
          } else {
            dispatch({
              type: 'CART_IS_READY',
            });
          }
        } catch (err) {
          console.error(err);
        }
      };
      getCart();
    }
  }, [authIsReady]);

  console.log('cart-context', state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
