const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[chunkhash].js'
    },
    devServer: {
        open: true,
        contentBase: './src/static/'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.[tj]s$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    annotation: true
                }
            }
        }),
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin([
            {
                from: './src/static/',
                to: './'
            }
        ])
    ]
};
