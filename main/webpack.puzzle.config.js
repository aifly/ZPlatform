/**
 * Created by fly on 2016/6/20 0020.
 */
var webpack = require('webpack');

var path = require('path');
var config = {
    entry:[
        'webpack-hot-middleware/client',
        './puzzle/index.jsx'

    ],
    output: {
        path:path.join(__dirname,'puzzle/static/js'),
        filename: "index.js",
        publicPath:"/puzzle/"
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
            test: /\.jsx|\.js|\.es6$/,
            loaders:['react-hot','babel?presets[]=es2015&presets[]=react'],
            include: __dirname,
            exclude: /node_modules/
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