/**
 * Created by fly on 2016/6/20 0020.
 */
var webpack = require('webpack');
var config = {
    entry: {
        'index': "./puzzle/index.jsx"
    },
    output: {
        path: './puzzle/static/js',
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true
    },
    module: {
        loaders: [{
            test: /\.jsx|\.js|\.es6$/,
            exclude: /node_modules/,
            loaders: ['babel']
        },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test:/\.svg$/,
                loader:'url-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }]
    },

}

module.exports = config;