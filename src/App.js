import { Routes, Route, Navigate } from 'react-router-dom';

import CartProvider from 'context/cart/CartProvider';
import AuthProvider from 'context/auth/AuthProvider';

import Layout from './setup/Layout';

import Home from './pages/Home';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Collections from './pages/Collections';
import Products from './pages/Products';
import Cart from './pages/Cart';

import './App.scss';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cuenta/login" element={<Login />} />
            <Route path="/cuenta/signup" element={<SignUp />} />
            <Route path="/categorias/:id" element={<Collections />} />
            <Route path="/productos/:id" element={<Products />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
