import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc, collection } from 'firebase/firestore';

import { auth } from 'db/config';
import { db } from 'db/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { updateCartAtLogin } from 'helpers/cart';

export const useLogin = () => {
  const { user: anonymousUser } = useAuthContext();
  const { dispatch: dispatchCartAction, items } = useCartContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);
    try {
      dispatchCartAction({ type: 'CART_NOT_READY' });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        throw Error('Error');
      }

      const user = userCredential.user;

      const cartRef = doc(db, 'carts', user.uid);
      const cartDoc = await getDoc(cartRef);

      const anonymousCartRef = doc(db, 'carts', anonymousUser.uid);
      const anonymousCartDoc = await getDoc(anonymousCartRef);

      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        let currentCartItems = cartData;
        let cartNeedsUpdate;

        if (anonymousCartDoc.exists()) {
          cartNeedsUpdate = true;
          await deleteDoc(doc(db, 'carts', anonymousUser.uid));

          const itemsForCartUpdate = [...items, ...cartData.items];
          currentCartItems = updateCartAtLogin(itemsForCartUpdate);
        }

        let fetchedProductsDocs = {};
        let fetchedVariantsDocs = {};

        const cartItemPromises = currentCartItems.items.map(async (item) => {
          const skuRef = doc(
            collection(db, 'productsTest2', item.productId, 'variantSkusTest2'),
            item.skuId
          );

          const skuDoc = await getDoc(skuRef);

          if (skuDoc.exists()) {
            const skuData = skuDoc.data();

            if (skuData.quantity > 0) {
              if (item.model) {
                return item;
              }
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

              if (item.quantity > skuData.quantity) {
                cartNeedsUpdate = true;
                currentQuantity = skuData.quantity;
              }

              return {
                ...item,
                quantity: currentQuantity,
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

        console.log('acaaaaaaaaaaaa', populatedCartItems);

        dispatchCartAction({
          type: 'UPDATE_CART',
          payload: populatedCartItems,
        });
      } else {
        if (anonymousCartDoc.exists()) {
          await deleteDoc(doc(db, 'carts', anonymousUser.uid));

          const updatedItemsDb = items.map((item) => ({
            skuId: item.skuId,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          }));

          await setDoc(cartRef, { items: updatedItemsDb });
        }
      }
      dispatchCartAction({ type: 'CART_IS_READY' });
    } catch (err) {
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError({ details: 'User/password is incorrect!' });
      } else {
        setError(err);
      }
      dispatchCartAction({ type: 'CART_IS_READY' });
    }
  };

  return { login, isLoading, error };
};
