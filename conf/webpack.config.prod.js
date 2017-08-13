process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

const config = merge(baseConfig, {
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'Webpack Build Prod',
      suppressSuccess: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
});

module.exports = config;
