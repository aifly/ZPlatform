/**
 * Created by fly on 2016/6/20 0020.
 */
var webpack = require('webpack');

var path = require('path');

function configs(modules){
    var config = {
    entry:{ /*
     [

        './company/index.jsx'
        ]
    */
        index:'./'+modules+'/index.jsx'
    },
    output: {
        path:'./'+modules+'/static/js',
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath:'/'+modules+'/'
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

    return config;

}

module.exports = configs;