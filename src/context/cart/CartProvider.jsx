import { useReducer, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { doc, getDoc, collection, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from 'db/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CartContext from './cart-context';

import { updateCartAtLogin } from 'helpers/cart';

const initialState = {
  items: [],
  cartIsReady: false,
  cartNeedsCheck: true,
  isLogin: true,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CART_IS_READY': {
      return {
        ...state,
        cartIsReady: true,
        isLogin: false,
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
        isLogin: false,
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
    case 'IS_LOGIN': {
      return {
        ...state,
        isLogin: true,
      };
    }
    case 'IS_NOT_LOGIN': {
      return {
        ...state,
        isLogin: false,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const location = useLocation();

  const { user } = useAuthContext();

  const firstLoad = useRef(true);

  useEffect(() => {
    if (user && state.isLogin) {
      dispatch({ type: 'CART_NOT_READY' });
      const getCart = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);

          if (
            (location.pathname === '/cart' ||
              location.pathname === '/checkout') &&
            firstLoad.current
          ) {
            firstLoad.current = false;
            dispatch({ type: 'NO_CHECK' });
          }

          let currentCartItems = [];
          let cartNeedsUpdate;

          if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            if (cartData.items.length > 0) {
              currentCartItems = cartData.items;
            } else {
              await deleteDoc(cartRef);
            }
          }

          if (state.items.length > 0) {
            cartNeedsUpdate = true;

            const itemsForCartUpdate = [...state.items, ...currentCartItems];
            currentCartItems = updateCartAtLogin(itemsForCartUpdate);
          }

          if (currentCartItems.length > 0) {
            let fetchedProductsDocs = {};
            let fetchedVariantsDocs = {};

            const cartItemPromises = currentCartItems.map(async (item) => {
              const skuRef = doc(
                collection(
                  db,
                  'products',
                  item.productId,
                  'skus'
                ),
                item.skuId
              );

              const skuDoc = await getDoc(skuRef);

              if (skuDoc.exists()) {
                const skuData = skuDoc.data();

                if (skuData.quantity > 0) {
                  let currenItemQuantity = item.quantity;

                  if (item.quantity > skuData.quantity) {
                    cartNeedsUpdate = true;
                    currenItemQuantity = skuData.quantity;
                  }

                  if (item.model) {
                    return { ...item, quantity: currenItemQuantity };
                  }

                  let productData;
                  let variantData;

                  if (!fetchedProductsDocs[item.productId]) {
                    const productRef = doc(db, 'products', item.productId);
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
                        'products',
                        item.productId,
                        'variants'
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
                    quantity: currenItemQuantity,
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
  }, [user]);

  console.log('cart-context', state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
