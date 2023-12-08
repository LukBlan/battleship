const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  mode: 'production',
  entry: '/src/example.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[contenthash].js',
    clean: true
  },

  module: {
    rules: [
      {test: /\.css$/i,use: [MiniCssExtractPlugin.loader, "css-loader"],}
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({template: './src/template/index.html'}),
    new MiniCssExtractPlugin({filename : "[name]-[hash].css"})
  ],
};