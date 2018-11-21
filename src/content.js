import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/app';

// Render static markup
const content = renderToString(<App />);
module.exports = content;
