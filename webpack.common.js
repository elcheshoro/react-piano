const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const scripts = path.resolve(__dirname, 'src');

const webpackConfig = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        include: [scripts],
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: [scripts],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};

module.exports = webpackConfig;
