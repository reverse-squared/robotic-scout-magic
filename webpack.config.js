const path = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (prod = false) => ({
    entry: [
        path.join(__dirname, './web/index.js'),
        ...(!prod ? ['webpack/hot/dev-server'] : [])
    ],
    module: {
        rules: [
            {
                test: /\.(png|ico|webmanifest)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|svg|eot|woff2?|otf)$/,
                use: 'file-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
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
        ...(!prod ? [new webpack.HotModuleReplacementPlugin()] : []),
        new webpack.DefinePlugin({
            $production: prod
        }),
        new (require('html-webpack-plugin'))({template:'./web/index.html'}),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    output: {
        filename: 'rsm.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devtool: prod ? 'none' : 'source-map',
    mode: prod ? 'production' : 'development'
});