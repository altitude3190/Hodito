const path = require('path');

var config = {
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js?$/,
  //       exclude: /node_modules/,
  //       loader: 'babel?cacheDirectory'
  //     },
  //     {
  //       test: /\.styl?$/,
  //       exclude: /(node_modules|bower_components)/,
  //       loader: 'style-loader!css-loader!stylus-loader'
  //     }
  //   ]
  // },
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'compiled'),
    filename: 'app.js',
    // sourceMapFilename: '[name].map',
    // libraryTarget: 'commonjs2',
    // publicPath: 'http://localhost:8080/assets/'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        loader: 'style!css!sass',
      }
    ]
  },
  // debug: true,
  // devtool: 'eval-source-map'
};

module.exports = config;
