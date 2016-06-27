module.exports = {
    entry: [
        "./static/js/index.jsx"
    ],
    output: {
        publicPath:'/richimg/build/',
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx|.js$/, loaders: ["babel"], exclude: /node_modules/ },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192'
            }
        ]
    }
};