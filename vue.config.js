const path = require('path').join(__dirname, "./");
const event = process.env.npm_lifecycle_event
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
    publicPath: "./",
    devServer: {
        port: 8902,
        proxy: "http://127.0.0.1:8701",
    },
    productionSourceMap: event == "build" ? false : true,
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                "@/*": `${path}/src/*`,
            },
        },
        plugins: [
            new HtmlWebpackTagsPlugin({
                append: false,
                useHash: true,
                usePublicPath: true,
                tags: ['vendor/vendor.js'],
            }),
        ]
    },
    transpileDependencies: event == "build" ? ["node_modules", "element-ui"] : []
}