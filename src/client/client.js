import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import App from './components/app';

// Inject global styles
const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    font-size: 1.6rem;
  }
`;

// Read, and then delete the preloaded data sent with markup
const data = window.preloadedData;
delete window.preloadedData;

// Confirm both server and client side pages are identical
hydrate(
  <Router>
    <>
      <App preloadedData={data} />
      <GlobalStyle />
    </>
  </Router>,
  document.getElementById('root'),
);
