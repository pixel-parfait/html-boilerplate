const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
    entry: ['./src/js/app.js'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public/assets')
    },
    module: {
        rules: [
            {
                test: /\.(eot|otf|svg|ttf|woff|woff2)(\?.*)?$/,
                include: [
                    path.resolve(__dirname, 'src/fonts')
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts',
                        publicPath: '../fonts/',
                        name: '[hash].[ext]'
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: [
                    path.resolve(__dirname, 'src/fonts')
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img',
                            name: '[name].[ext]'
                        },
                    },
                ],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        })
    ]
};

module.exports = config;
