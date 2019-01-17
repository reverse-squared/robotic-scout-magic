const path = require('path');
const webpack = require('webpack');
const spreadIf = require('spreadif');

module.exports = (prod = false) => ({
    entry: [
        path.join(__dirname, './web/index.js'),
        ...(prod ? [] : ['webpack/hot/dev-server'])
    ],
    module: {
        rules: [
            {
                test: /\.ttf$/,
                use: 'file-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader', options: {
                            plugins: [
                                require('cssnano')(),
                                require('autoprefixer')(),
                            ]
                        }
                    }
                ]
            },
        ]
    },
    devServer: {
        hot: true
    },
    plugins: [
        ...(prod ? [] : [new webpack.HotModuleReplacementPlugin()]),      
        new webpack.DefinePlugin({
            $production: prod
        }),
        new (require('html-webpack-plugin'))({template:'./web/index.html'})
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: prod ? 'none' : 'source-map',
    mode: prod ? 'production' : 'development'
});