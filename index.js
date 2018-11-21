const express = require('express');
const app = express();
const path = require('path');
const template = require('./views/template');
const content = require('./views/content');
// Temp data for app (without api)
const data = require('./assets/data.json');

// Serve static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));
// Remove powered by express
app.disable('x-powered-by');
// Listen on PORT (env var), or 3000
app.listen(process.env.PORT || 3000);

// Server side rendering
app.get('*', (req, res) => {
  const response = template(content);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
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
