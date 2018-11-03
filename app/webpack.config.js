/**
 * Webpack configuration file
 */

const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: `${srcDir}/index.js`,
  },
  devServer: {
    contentBase: distDir,
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: distDir,
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
