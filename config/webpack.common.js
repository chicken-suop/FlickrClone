const path = require('path');

module.exports = {
  context: process.cwd(),
  node: { __filename: true },
  entry: { client: './src/client/client.js' },
  output: {
    path: path.resolve(process.cwd(), 'assets'),
    publicPath: '/',
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
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                'babel-plugin-styled-components',
                { displayName: false },
              ],
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
};
