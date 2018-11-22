import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';

// Read, and then delete the preloaded data sent with markup
const data = window.preloadedData;
delete window.preloadedData;

// Confirm both server and client side pages are identical
hydrate(
  <BrowserRouter>
    <App preloadedData={data} />
  </BrowserRouter>,
  document.getElementById('root'),
);
