// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthProvider from 'context/auth/AuthProvider';
import CartProvider from 'context/cart/CartProvider';

import 'tw-elements';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <Router>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </Router>
  // </React.StrictMode>
);
