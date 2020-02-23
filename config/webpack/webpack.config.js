const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssVariables = require('postcss-css-variables');
const postcssImport = require('postcss-import');

const DIST_PATH = path.join(__dirname, '..', '..', 'dist');
const ASSETS_PATH = path.join(__dirname, '..', '..', 'assets');

module.exports = {
    entry: ['webpack-hot-middleware/client?reload=true', './src/index.js'],
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(DIST_PATH)
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(ASSETS_PATH, 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName:
                                '[name]___[local]___[hash:base64:5]',
                            camelCase: true,
                            url: true,
                            import: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: [postcssImport(), postcssVariables()]
                        }
                    }
                ]
            }
        ]
    }
};
