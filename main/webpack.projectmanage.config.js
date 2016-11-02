/**
 * Created by fly on 2016/6/20 0020.
 */
var webpack = require('webpack');

var path = require('path');
var config = {
    entry:{ /*
     [

        './projectmanage/index.jsx'
        ]
    */
        index:'./projectmanage/index.jsx'
    },
    output: {
        path:'./projectmanage/static/js',
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath:"/projectmanage/"
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true
    },
    plugins: [
      /*  new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()*/
    ],
    externals:[
      /*  {"./node_modules/react/react.js":"React"}*/
    ],
    module: {
        loaders: [
            {
            test: /\.jsx|\.js|\.es6$/,
            loaders:['babel'],//['react-hot','babel?presets[]=es2015&presets[]=react'],
            //include: __dirname,
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