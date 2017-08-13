process.env.NODE_ENV = 'development';

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

const config = merge(baseConfig, {
  watch: false,
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  devServer: {
    proxy: {
      '*': 'http://localhost:8080',
    },
    contentBase: 'build',
    historyApiFallback: true,
    noInfo: true,
    port: 3000,
  },
  devtool: 'source-map',
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'Webpack Build Dev',
      suppressSuccess: true,
    }),
  ],
});
module.exports = config;
