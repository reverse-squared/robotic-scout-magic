const path = require("path");
const webpack = require("webpack");

module.exports = (prod = false) => ({
    entry: path.join(__dirname, "./web/index.js"),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader" },
                    {
                        loader: "postcss-loader", options: {
                            plugins: [
                                require("cssnano")(),
                                require("autoprefixer")(),
                            ]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        ...(prod ? [] : [new webpack.HotModuleReplacementPlugin()]),
        new webpack.DefinePlugin({
            $production: prod
        }),
        new (require("html-webpack-plugin"))({template:"./web/index.html"})
    ],
    resolve: {
        extensions: [".jsx", ".jsx", ".json"]
    },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: prod ? "none" : "source-map",
    mode: prod ? "production" : "development"
});