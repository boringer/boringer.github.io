const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]-[chunkhash].js'
	},
	devServer: {
		port: 9999,
		open: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						'css-loader',
						'postcss-loader',
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	plugins: [
		new CleanPlugin([
			'dist'
		]),
		new ExtractTextPlugin('[name]-[contenthash].css'),
		new HtmlPlugin({
			template: './src/index.html'
		})
	]
};
