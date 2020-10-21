const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// Копирование изображений, шрифтов, uploads итд
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Stylelint
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')


// Проверка настройки
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './assets/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/index.bundle.js'
  },
  // Generate sourcemaps for proper error messages
  // Исходные карты для правильных сообщениях об ошибках
  devtool: 'source-map',
  performance: {
    // Turn off size warnings for entry points
    // Отключить предупреждения о размере точек входа
    hints: false,
  },

  /*resolve: {
      alias: {
          '@': path.resolve(__dirname, 'src'),
          '@core': path.resolve(__dirname, 'src/core')
      }
  },*/

  // DevServer
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './assets/html/index.html',
      filename: 'index.html',
      minify: false, // Disable minification during production mode
      hash: true,
    }),

    new HtmlWebpackPlugin({
      template: './assets/html/404.html',
      filename: '404.html',
      minify: false, // Disable minification during production mode
      hash: true,
    }),

    new MiniCssExtractPlugin({
      filename: './css/styles.css'
    }),

    new StylelintWebpackPlugin({
      configFile: '.stylelintrc',
      // failOnError: false,
      emitWarning: true,
      // emitError: true
    }),

    // Плагин копирования/Копируем изображения
    /*new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets/images',
          to: 'images'
        },

      ],
    }),*/

  ],
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                  // {} options
                ]
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre', // checked before being processed by babel-loader
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,

      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath) => {
                console.log(url, resourcePath, 'resourcePath')
                if (/icon\.png|tile\.png|tile-wide\.png/.test(resourcePath)) {
                  return url
                } else {
                  return `images/${url}`
                }
              },
              name: '[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: process.env.NODE_ENV !== 'production', // Disable during development
              mozjpeg: {
                progressive: true,
                quality: 75
              },
            },
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /(favicon\.ico|site\.webmanifest|browserconfig\.xml|robots\.txt|humans\.txt)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      },
    ],
    /*rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true,
                        reloadAll: true,
                        publicPath: 'dist',
                        sourceMap: false,
                    }
                },
                'css-loader',
                'postcss-loader',
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
    ]*/
  }
}

