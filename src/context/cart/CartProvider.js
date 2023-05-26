import { useReducer, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { useAuthContext } from 'hooks/useAuthContext';

import CartContext from './cart-context';

// TODO: Delete total amount

const initialState = {
  items: [],
  totalAmount: 0,
  cartIsReady: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_IS_READY': {
      return {
        ...state,
        cartIsReady: true,
      };
    }
    case 'UPDATE_CART': {
      return {
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
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
    // if (user) {
    //   const getCart = async () => {
    //     try {
    //       const cartRef = doc(db, 'carts', user.uid);
    //       const cartDoc = await getDoc(cartRef);
    //       if (cartDoc.exists()) {
    //         const cartDb = { ...cartDoc.data() };
    //         const cart = [];
    //         const productIds = [];
    //         const products = [];
    //         for (const item of cartDb.items) {
    //           console.log(item);
    //           const inventoryRef = doc(db, 'inventory', item.sku);
    //           const inventoryDoc = await getDoc(inventoryRef);
    //           if (inventoryDoc.exists()) {
    //             const inventoryData = { ...inventoryDoc.data() };
    //             if (!productIds.includes(item.productId)) {
    //               productIds.push(item.productId);
    //               const productRef = doc(db, 'products', item.productId);
    //               const productDoc = await getDoc(productRef);
    //               const productData = {
    //                 id: productDoc.id,
    //                 ...productDoc.data(),
    //               };
    //               products.push(productData);
    //             }
    //             const product = products.find(
    //               (product) => (product.id = item.productId)
    //             );
    //             const variant = product.variants.find(
    //               (variant) => (variant.id = item.variantId)
    //             );
    //             cart.push({
    //               amount: item.amount,
    //               color: variant.color,
    //               description: product.description,
    //               model: product.model,
    //               price: variant.currentPrice,
    //               productId: item.productId,
    //               thumbanil: variant.images[0].src,
    //               type: product.type,
    //               slug: variant.slug,
    //               id: item.sku,
    //               size: inventoryData.size,
    //             });
    //           }
    //         }
    //         dispatch({
    //           type: 'UPDATE_CART',
    //           payload: { items: [...cart], totalAmount: cartDb.totalAmount },
    //         });
    //       } else {
    //         dispatch({
    //           type: 'CART_IS_READY',
    //         });
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   getCart();
    // }
  }, [user]);

  console.log('cart-context', state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
