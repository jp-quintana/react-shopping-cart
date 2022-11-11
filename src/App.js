import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';

import CartProvider from 'context/cart/CartProvider';

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

import Loader from './common/Loader';

import './App.scss';

const App = () => {
  const { authIsReady } = useAuthContext();
  return (
    <>
      {!authIsReady && <Loader />}
      {authIsReady && (
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/categorias/:id" element={<Collections />} />
              <Route path="/productos/:id" element={<Products />} />
              <Route path="/carrito" element={<Cart />} />

              <Route element={<ProtectedRoutes needAuth={true} />}>
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
        </CartProvider>
      )}
    </>
  );
};

export default App;
