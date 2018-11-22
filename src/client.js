import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/app';

// Confirm both server and client side pages are identical
hydrate(<App />, document.querySelector('#app'));
