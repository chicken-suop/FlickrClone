const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const compression = require('compression');
const template = require('./views/template');
const content = require('./views/content');

// New Express instance
const app = express();

// Handle Gzip
app.use(compression())

// Serve static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// Remove powered by express
app.disable('x-powered-by');

// robots.txt
app.get('/robots.txt', (req, res, next) => {
  res.type('text/plain')
  res.send("User-agent: *\nDisallow: ");
});

// Stop server during local development
app.get('/exit', (req, res) => {
  if (process.env.PORT) {
    res.send("Request denied.");
  } else {
    res.send("Shutting down...");
    process.exit(0);
  }
});

// Server side rendering
app.get('*', (req, res) => {
  const response = template(content);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
});

// Add key and cert for SSL
const options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert:  fs.readFileSync(__dirname + '/server.crt')
}

// Load SSL options, and Express instance
https.createServer(options, app).listen(443, (error) => {
  if (error) {
    console.error(error)
    return process.exit(1)
  } else {
    console.log('Listening on port: 443.')
  }
});


// Redirect http to https
http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);
