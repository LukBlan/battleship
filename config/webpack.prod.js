const path = require('path');

module.exports = {
  mode: 'production',
  entry: '/src/example.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
  },
};