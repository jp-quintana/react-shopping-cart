import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCartContext } from 'hooks/useCartContext';

import ProductProvider from 'context/product/ProductProvider';
import CheckoutProvider from 'context/checkout/CheckoutProvider';

import { Layout } from 'components/layouts';
import { ProtectedRoutes } from 'components/routes';

import {
  HomePage,
  AccountPage,
  AddressesPage,
  LoginPage,
  SignUpPage,
  CollectionPage,
  ProductPage,
  CartPage,
  CheckoutPage,
} from './components/pages';

import { Loader } from './components/common';

import './App.scss';

const App = () => {
  const { authIsReady } = useAuthContext();
  const { cartIsReady } = useCartContext();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className="fonts_license">
        Font made from{' '}
        <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed
        by CC BY 3.0
      </div>
      {(!authIsReady || !cartIsReady) && <Loader />}
      {authIsReady && cartIsReady && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="collections/:id" element={<CollectionPage />} />
            <Route
              path="products/:id"
              element={
                <ProductProvider>
                  <ProductPage />
                </ProductProvider>
              }
            />
            <Route path="cart" element={<CartPage />} />

            <Route element={<ProtectedRoutes needAuth={true} />}>
              <Route
                path="checkout"
                element={
                  <CheckoutProvider>
                    <CheckoutPage />
                  </CheckoutProvider>
                }
              />
              <Route path="account" element={<AccountPage />} />
              <Route path="account/addresses" element={<AddressesPage />} />
            </Route>

            <Route element={<ProtectedRoutes needAuth={false} />}>
              <Route path="account/login" element={<LoginPage />} />
              <Route path="account/signup" element={<SignUpPage />} />
            </Route>

            {/* <Route element={<ProtectedRoutes needAdmin={true} />}>
              <Route path="admin" element={<AdminPage />} />
              <Route path="admin/products" element={<AdminCollections />} />
              <Route path="admin/products/add" element={<AdminAddProduct />} />
              <Route
                path="admin/products/:productId"
                element={<AdminEditProduct />}
              />
            </Route> */}

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
