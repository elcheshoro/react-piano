const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common.js');

const scripts = path.resolve(__dirname, 'src');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint-loader'],
        enforce: 'pre',
        include: [scripts],
      },
    ],
  },
});
