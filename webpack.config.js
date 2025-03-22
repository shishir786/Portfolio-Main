const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './js/script.js', // Entry point for JavaScript
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.[contenthash].js' // Output JS file
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html' // Path to HTML template
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css' // Output CSS file
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // Process CSS files
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(webp|png|svg)$/, // Process image files
        type: 'asset/resource'
      }
    ]
  }
};