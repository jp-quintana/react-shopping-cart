import { useReducer, useEffect } from 'react';

import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from 'db/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CartContext from './cart-context';

// TODO: Delete total amount

const initialState = {
  items: [],
  totalAmount: 0,
  cartIsReady: false,
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
    case 'UPDATE_CART': {
      return {
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

    default: {
      return state;
    }
  }
};

const CartProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // TODO: Update Cart Schema

  useEffect(() => {
    if (user) {
      // const getCart = async () => {
      //   try {
      //     const cartRef = doc(db, 'carts', user.uid);
      //     const cartDoc = await getDoc(cartRef);
      //     if (cartDoc.exists()) {
      //       const cartDb = { ...cartDoc.data() };
      //       const cart = [];
      //       const productIds = [];
      //       const products = [];
      //       for (const item of cartDb.items) {
      //         const inventoryRef = doc(db, 'inventory', item.sku);
      //         const inventoryDoc = await getDoc(inventoryRef);
      //         if (inventoryDoc.exists()) {
      //           const inventoryData = { ...inventoryDoc.data() };
      //           if (!productIds.includes(item.productId)) {
      //             productIds.push(item.productId);
      //             const productRef = doc(db, 'products', item.productId);
      //             const productDoc = await getDoc(productRef);
      //             const productData = {
      //               id: productDoc.id,
      //               ...productDoc.data(),
      //             };
      //             products.push(productData);
      //           }
      //           const product = products.find(
      //             (product) => (product.id = item.productId)
      //           );
      //           const variant = product.variants.find(
      //             (variant) => (variant.id = item.variantId)
      //           );
      //           cart.push({
      //             amount: item.amount,
      //             color: variant.color,
      //             description: product.description,
      //             model: product.model,
      //             price: variant.currentPrice,
      //             productId: item.productId,
      //             thumbnail: variant.images[0].src,
      //             type: product.type,
      //             slug: variant.slug,
      //             id: item.sku,
      //             size: inventoryData.value,
      //           });
      //         }
      //       }
      //       dispatch({
      //         type: 'UPDATE_CART',
      //         payload: { items: [...cart], totalAmount: cartDb.totalAmount },
      //       });
      //     } else {
      //       dispatch({
      //         type: 'CART_IS_READY',
      //       });
      //     }
      //   } catch (err) {
      //     console.error(err);
      //   }
      // };
      const getCart = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);
          if (cartDoc.exists()) {
            const cartData = cartDoc.data();

            let fetchedProductsDocs = {};
            let fetchedVariantsDocs = {};

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
                }
              }
            });

            const populatedCartItems = await Promise.all(cartItemPromises);

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
