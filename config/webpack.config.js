const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const webpackConfig = {
    entry: {
        home: path.resolve(__dirname, '../src/views/home/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/views/home/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: `css/[name]_v[hash:4].css`
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
