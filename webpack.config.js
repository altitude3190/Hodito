const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'src/js/app.js'),
        path.join(__dirname, 'src/sass/main.sass'),
    ],
    output: {
        path: path.join(__dirname, 'compiled'),
        filename: 'app.js',
    },
    target: 'electron',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract(
                    'style', 'css!sass'
                ),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
};
