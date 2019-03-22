const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
    entry: ['./src/js/app.js', './src/sass/main.scss'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        })
    ],
    externals: {
        "jquery": "jQuery"
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';

        config.module.rules.push({
            test: /\.(js)$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader'
        },
        {
            test: /\.s?css$/i,
            use: ['style-loader', 'css-loader?sourceMap=true', 'postcss-loader', 'sass-loader']
        });
    }

    if (argv.mode === 'production') {
        config.module.rules.push({
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.s?css/i,
            use : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        });
    }

    return config;
};
