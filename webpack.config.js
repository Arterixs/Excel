const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const esLintPlugin = isDev => isDev ? [] : [new ESLintPlugin({ extensions: 'js' })]

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: 'development',
    entry: ["@babel/polyfill","./script.js"],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, "src/core"),
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 8000,
        hot: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        ...esLintPlugin(isDev)
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader",
                ],
              },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ico$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|ttf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
        ]
    }
}
