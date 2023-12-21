const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: '/src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[contenthash].js',
    clean: true,
    assetModuleFilename: 'asset/[hash][ext][query]',
  },

  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/template/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
  ],
};
