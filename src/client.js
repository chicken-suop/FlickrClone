import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';

// Confirm both server and client side pages are identical
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
