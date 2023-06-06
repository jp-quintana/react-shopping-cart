import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCartContext } from 'hooks/useCartContext';

import ProductProvider from 'context/product/ProductProvider';
import CheckoutProvider from 'context/checkout/CheckoutProvider';

import Layout from 'components/setup/Layout';
import ProtectedRoutes from 'components/setup/ProtectedRoutes';

import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminCollections from './pages/AdminCollections';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import Account from './pages/Account';
import Addresses from './pages/Addresses';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Collections from './pages/Collections';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

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
            <Route index element={<Home />} />
            <Route path="collections/:id" element={<Collections />} />
            <Route
              path="products/:id"
              element={
                <ProductProvider>
                  <Products />
                </ProductProvider>
              }
            />
            <Route path="cart" element={<Cart />} />

            <Route element={<ProtectedRoutes needAuth={true} />}>
              <Route
                path="checkout"
                element={
                  <CheckoutProvider>
                    <Checkout />
                  </CheckoutProvider>
                }
              />
              <Route path="account" element={<Account />} />
              <Route path="account/addresses" element={<Addresses />} />
            </Route>

            <Route element={<ProtectedRoutes needAuth={false} />}>
              <Route path="account/login" element={<Login />} />
              <Route path="account/signup" element={<SignUp />} />
            </Route>

            <Route element={<ProtectedRoutes needAdmin={true} />}>
              <Route path="admin" element={<Admin />} />
              <Route path="admin/products" element={<AdminCollections />} />
              <Route path="admin/products/add" element={<AdminAddProduct />} />
              <Route
                path="admin/products/:productId"
                element={<AdminEditProduct />}
              />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
