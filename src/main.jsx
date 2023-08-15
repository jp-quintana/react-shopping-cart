import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';

import Provider from 'context/Provider';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Router>
    <Provider>
      <App />
    </Provider>
  </Router>
  // </React.StrictMode>
);
