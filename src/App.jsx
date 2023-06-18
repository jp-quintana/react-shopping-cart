import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCartContext } from 'hooks/useCartContext';

import ProductProvider from 'context/product/ProductProvider';
import CheckoutProvider from 'context/checkout/CheckoutProvider';

import Layout from 'components/setup/Layout';
import ProtectedRoutes from 'components/setup/ProtectedRoutes';

import HomePage from './pages/HomePage';
import Admin from './pages/Admin';
import AdminCollections from './pages/AdminCollections';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import AccountPage from './pages/AccountPage';
import AddressesPage from './pages/AddressesPage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import CollectionPage from './pages/CollectionPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import Loader from './components/common/Loader';

import './App.scss';

const App = () => {
  const { authIsReady } = useAuthContext();
  const { cartIsReady } = useCartContext();

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
              <Route path="admin" element={<Admin />} />
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
