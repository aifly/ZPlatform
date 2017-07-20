var webpack = require('webpack');

var config = {
    entry: {
        'index': "./index.jsx",
        'admin':'./admin/index.jsx',
        react:['react','react-dom','./static/editor/froala_editor.min.js','./static/editor/align.min.js','./static/editor/colors.min.js'],
        iscroll:['jquery','iscroll','./puzzle/static/js/createjs.js'],
        echarts:['echarts/lib/echarts','echarts/lib/chart/map'],
        antd:[
        'antd/lib/button',
        'antd/lib/message',
        'antd/lib/input',
        'antd/lib/table',
        'antd/lib/modal',
        'antd/lib/steps',
        'antd/lib/tree',
        'antd/lib/tag',
        'antd/lib/slider',
        'antd/lib/form',
        'antd/lib/icon',
        'antd/lib/radio',
        'antd/lib/progress',
        'antd/lib/tabs',
        'antd/lib/switch',
        'antd/lib/card',
        'antd/lib/menu',
        'antd/lib/date-picker',
        'antd/lib/select',
        'antd/lib/row',
        'antd/lib/col',
        'antd/lib/checkbox',
        'antd/lib/popconfirm',
        'antd/lib/badge',
        'antd/lib/notification',
        'antd/lib/spin',
        'antd/lib/input-number',
        'antd/lib/tooltip',
        'antd/lib/layout',
        'antd/lib/cascader',
        'antd/lib/popover'
        ]
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
           name:['react','iscroll','echarts','antd'],  
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