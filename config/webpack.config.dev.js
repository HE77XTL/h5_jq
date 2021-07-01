const base = require('./webpack.config.js');
const path = require('path');

module.exports = Object.assign({}, base, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 9001,
        hot: true,
        open: true,
        openPage: 'home',
    },
})
