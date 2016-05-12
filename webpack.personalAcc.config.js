var webpack = require('webpack');
var config = {
    entry: {
        'index': "./personalAcc/index.jsx"
    },
    output: {
        publickPath: './personalAcc/static/js',
        path: './personalAcc/static/js',
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
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
}

module.exports = config;