import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from 'pages/Login';

import CartProvider from 'context/CartProvider';

import Layout from './setup/Layout';

import './App.scss';

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cuenta/login" element={<Login />} />
          <Route path="/categorias/:id" element={<Collections />} />
          <Route path="/productos/:id" element={<Products />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default App;
