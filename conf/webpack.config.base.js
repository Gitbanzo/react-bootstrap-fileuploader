const nodeExternals = require('webpack-node-externals');

const path = {
  BUILD: './src/',
};
const config = {
  target: 'node',
  entry: {
    index: `${path.BUILD}index.js`,
  },
  output: {
    path: `${process.cwd()}/`,
    publicPath: '/',
    filename: '[name].js',
    library: 'react-bootstrap-fileuploader',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        use: 'url-loader',
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
};

module.exports = config;
