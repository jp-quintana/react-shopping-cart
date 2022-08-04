import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Products from './pages/Products';

import Layout from './setup/Layout';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/categorias/:id" element={<Collections />} />
        <Route path="/productos/:id" element={<Products />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
