// /* eslint-disable */
import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import http from 'http';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter, matchPath } from 'react-router-dom';
import template from './template';
import App from './client/components/app';
import routes from './client/routes';

// New Express instance
const app = express();

// Handle Gzip compression
app.use(compression());

// Serve static files
app.use('/', express.static(path.resolve(process.cwd(), 'assets')));

// Remove powered by express
app.disable('x-powered-by');

// Create robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: ');
});

// Server side rendering
app.get('/*', (req, res) => {
  const context = {};
  // Find matching path
  const currentRoute = routes.find(route => matchPath(req.url, route)) || {};

  // Check if route has data requirement
  let dataRequirement;
  if (currentRoute.fetchData) {
    dataRequirement = currentRoute.fetchData(req.params);
  } else {
    dataRequirement = Promise.resolve(null);
  }

  // const dataRequirements = routes
  //   .filter(route => matchPath(req.url, route))
  //   .filter(route => route.fetchData) // check if route has data requirement
  //   .map(route => route.fetchData(req.params));

  dataRequirement.then((data) => {
    const preloadedData = data;
    // Create stylesheet
    const sheet = new ServerStyleSheet();
    const jsx = (
      sheet.collectStyles(
        <StaticRouter location={req.url} context={context}>
          <App preloadedData={preloadedData} />
        </StaticRouter>,
      )
    );
    const reactDom = renderToString(jsx);

    // Get tags from stylesheet
    const styles = sheet.getStyleTags();

    // Hanlde cache
    res.send(template({ styles, reactDom, preloadedData }));
  }).catch((error) => {
    console.log(error);
  });
});

// Add key and cert for SSL
const options = {
  key: fs.readFileSync(`${process.cwd()}/localhost.key`),
  cert: fs.readFileSync(`${process.cwd()}/localhost.crt`),
};

// Load SSL options, and Express instance
https.createServer(options, app).listen(443, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  }
  console.log('Listening on port: 443.');
});


// Redirect http to https
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);
