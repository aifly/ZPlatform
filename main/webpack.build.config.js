var webpack = require('webpack');
var path = require('path');
var config = {
  entry: {
    'index': "./index.jsx",
    'admin': './admin/index.jsx',
    vendor: ['react', 'react-dom', './static/editor/froala_editor.min.js', './static/editor/align.min.js', './static/editor/colors.min.js'],
    vendor1: ['jquery', 'iscroll'],
    vendor2: ['echarts/lib/echarts', 'echarts/lib/chart/map'],

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
  externals: {
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
      name: ['vendor', 'vendor1', 'vendor2'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
	module: {
		// 指定 不同的模块使用不同的加载器处理
		// 以 .css 结尾的文件，使用 css-loader 解析css模块，使用 style-loader 将生成的 css 内容以标签的形式添加到 HTML 文档中
		rules: [
			{
				// 文件匹配正则
				test: /\.css$/,
				// 加载器，从后向前倒序使用
				exclude: /node_modules/,
				loaders: ['style-loader', 'css-loader']
			},
			{
				test: /\.jsx|\.js|\.es6$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			}
		]
	}

}

module.exports = config;