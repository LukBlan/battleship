const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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

  optimization: {
    minimize: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
    new CssMinimizerPlugin(),
  ],
};
