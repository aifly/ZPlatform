/**
 * Created by linten01 on 2016/5/24 0024.
 */
var path = require('path');
module.exports = {

    entry:{
        'index':'./index.es6'
    },
    output:{
        path:"./statices/js/",
        filename:'[name].js'
    },
    devServer: {
        inline: true,
        port: 5000,
        hot: true
    },
    module:{
        loaders:[
            {
                test:path.join(__dirname,''),
                loaders:['babel-loader'],
                exclude:/node_modules/,
            },
            {
                test:/\.png|\.jpg|\.gif$/,
                loaders:["url-loader?limit=30720"] //30720
            },
            {
                test:/.css$/,
                loader:'style-loader!css-loader'
            }
        ]
    }


};