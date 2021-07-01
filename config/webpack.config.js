const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** 从 page.config.js 中扫描获取入口以及对应的模板*/
function scanEntry() {
    const srcDir = path.join(__dirname, '../src/views');
    return glob.sync(srcDir + '/**/page.config.js').map(name => {
        const dirPattern = /(?<=\/views\/).*(?=\/)/;
        const dirName = name.match(dirPattern);
        const pageConfig = require(name)
        return {
            name: dirName[0],
            pages: pageConfig.pages
        }
    });

}

function getEntryAndTemplate(modelData) {
    let entry = {};
    let htmlTemplate = [];

    modelData.forEach(item => {
        item.pages.forEach(pagesItem => {
            const entryKey = item.name + '_' + pagesItem.entry.replace('.js', '');
            entry[entryKey] = path.resolve(__dirname, `../src/views/${item.name}/${pagesItem.entry}`);
            htmlTemplate.push(new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `../src/views/${item.name}/${pagesItem.template}`),
                filename: `html/${item.name}/${pagesItem.template}`,
                chunks: [entryKey],
            }))
        })
    });
    return {
        entry,
        htmlTemplate
    }
}

const {entry, htmlTemplate} = getEntryAndTemplate(scanEntry());
const webpackConfig = {
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]_v[hash].js',
        clean: true,
    },
    plugins: htmlTemplate.concat([
        new MiniCssExtractPlugin({
            filename: `css/[name]_v[hash].css`
        })
    ]),
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
