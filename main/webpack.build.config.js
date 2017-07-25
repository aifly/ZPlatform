var webpack = require('webpack');

var config = {
    entry: {
        'index': "./index.jsx",
        'admin':'./admin/index.jsx',
        vendor:['react','react-dom','./static/editor/froala_editor.min.js','./static/editor/align.min.js','./static/editor/colors.min.js'],
        vendor1:['jquery','iscroll','./puzzle/static/js/createjs.js'],
        vendor2:['echarts/lib/echarts','echarts/lib/chart/map'],
       
    },
    output: {
        //publicPath: './static/js',
        path: './static/js',
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
      /*new webpack.optimize.CommonsChunkPlugin({
         name:"vendor",  
      }),*/
        new webpack.optimize.CommonsChunkPlugin({
           name:['vendor','vendor1','vendor2'],  
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress:{
           warnings:false
          },
          mangle:{
           except:['$super','$','exports','require']
          }
        }),
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production") 
           }
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx|\.js|\.es6$/,
            exclude: /node_modules/,
            loaders: ['react-hot','babel']
            },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
                loader: 'file'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }]
    },

}

module.exports = config;