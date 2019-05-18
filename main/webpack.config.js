var webpack = require('webpack');
var path = require('path');
var config = {
    entry: {
        'index': "./index.jsx",
       // 'admin':'./admin/index.jsx',
        //vendor: ['react','react-dom','iscroll','jquery']
    },
    output: {
        //publicPath: './static/js',
		path: path.resolve(__dirname, './static/js'),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true
    },
    externals:{
        //'react':'React',
        //'react-dom':'ReactDOM',
        //'jquery':"$",
       // 'iscroll':'IScroll'
    },
    plugins: [
     /* new webpack.optimize.CommonsChunkPlugin({
         name:"vendor",  
      }),*/
    ],
    module: {
		rules: [{
				test: /\.jsx|\.js|\.es6$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
            },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }]
    },

}

module.exports = config;