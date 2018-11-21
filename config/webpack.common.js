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
        },
      },
    ],
  },
};
