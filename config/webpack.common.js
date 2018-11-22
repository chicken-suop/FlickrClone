const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  // resolve: { modules: ['./node_modules'], extensions: ['.js', '.jsx'] },
  context: process.cwd(),
  node: { __filename: true },
  entry: { client: './src/client.js' },
  output: {
    path: path.resolve(process.cwd(), 'assets'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    // Will remove all js files
    new CleanWebpackPlugin(
      ['*.js'],
      { root: path.resolve(process.cwd(), 'assets'), watch: true },
    ),
    new WorkboxPlugin.GenerateSW({
      // Exclude images from the precache
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // Define runtime caching rules.
      runtimeCaching: [{
        // Cache server side rendered code
        urlPattern: '/',
        handler: 'networkFirst',
        options: { cacheName: 'html-cache' },
      }, {
        // Match any request ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'cacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'images',

          // Only cache 10 images.
          expiration: {
            maxEntries: 10,
          },
        },
      }],
    }),
  ],
};
