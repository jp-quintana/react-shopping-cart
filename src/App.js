import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';
import { useCartContext } from 'hooks/useCartContext';

import ProductProvider from 'context/product/ProductProvider';
import CheckoutProvider from 'context/checkout/CheckoutProvider';

import Layout from './setup/Layout';
import ProtectedRoutes from './setup/ProtectedRoutes';

import Home from './pages/Home';
import Account from './pages/Account';
import Addresses from './pages/Addresses';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Collections from './pages/Collections';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import Loader from './components/Loader';

import './App.scss';

const App = () => {
  const { authIsReady } = useAuthContext();
  const { cartIsReady } = useCartContext();

  console.log(cartIsReady);

  return (
    <>
      {(!authIsReady || !cartIsReady) && <Loader />}
      {authIsReady && cartIsReady && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/categorias/:id" element={<Collections />} />
            <Route
              path="/productos/:id"
              element={
                <ProductProvider>
                  <Products />
                </ProductProvider>
              }
            />
            <Route path="/carrito" element={<Cart />} />

            <Route element={<ProtectedRoutes needAuth={true} />}>
              <Route
                path="/checkout"
                element={
                  <CheckoutProvider>
                    <Checkout />
                  </CheckoutProvider>
                }
              />
              <Route path="/cuenta" element={<Account />} />
              <Route path="/cuenta/direcciones" element={<Addresses />} />
            </Route>

            <Route element={<ProtectedRoutes needAuth={false} />}>
              <Route path="/cuenta/login" element={<Login />} />
              <Route path="/cuenta/signup" element={<SignUp />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
