const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: '/src/example.js',
  module: {
    rules: [
      {test: /\.css$/i,use: ["style-loader", "css-loader"],}
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({template: './src/template/index.html'}),
  ],
};