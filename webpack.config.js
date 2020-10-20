const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// Копирование изображений, шрифтов, uploads итд
// Переделать шрифты,
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Проверка настройки
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devServer: {
        hot: true,
        port: 3000
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            // title: 'Start Template - jsmaster',
            filename: 'index.html',
            template: './index.html',
            minify: {
                collapseWhitespace: false,
            }
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'assets/images/',
                    to: 'assets/images/'
                },

            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                            publicPath: 'dist',
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    publicPath: './assets/fonts',
                    // outputPath: './assets1/fonts/test',
                }
            },
            /*{
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: '/assets/images/',
                },
            },*/
        ]
    }
}

