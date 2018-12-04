import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import App from './components/App';

// Inject global styles
const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    font-size: 1.6rem;
    font-family: 'Source Sans Pro', sans-serif;
    background: #ff7657;
  }
`;

// Read, and then delete the preloaded data sent with markup
const { preloadedData } = window;
delete window.preloadedData;

// Confirm both server and client side pages are identical
hydrate(
  <BrowserRouter>
    <>
      <App preloadedData={preloadedData} />
      <GlobalStyle />
    </>
  </BrowserRouter>,
  document.getElementById('root'),
);
