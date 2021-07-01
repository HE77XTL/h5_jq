const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const webpackConfig = {
    mode: 'production',
    entry: {
        home: path.resolve(__dirname, '../src/views/home/index.js'),
        about: path.resolve(__dirname, '../src/views/about/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]/index_v[hash].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/views/home/index.html'),
            filename: 'home/index.html',
            chunks: ['home'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/views/about/index.html'),
            filename: 'about/index.html',
            chunks: ['about'],
        }),
        new MiniCssExtractPlugin({
            filename: `[name]/[name]_v[hash].css`
        })
    ],
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [

                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ]
            },
        ]
    }
};

module.exports = webpackConfig
