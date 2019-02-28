const path = require("path"),
	UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
	CleanWebpackPlugin = require("clean-webpack-plugin"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	HtmlMinifierPlugin = require("html-minifier-webpack-plugin");

module.exports = {
	mode: "production",
	entry: ["@babel/polyfill", "./index.js"],
	output: {
		filename: "bundle.[contenthash].js",
		path: path.resolve(__dirname, "./doc"),
		// when a website is deployed it needs to be changed to the name of the website - public path
		publicPath: ""
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCssAssetsPlugin()
		],
		minimize: true
	},
	module: {
		rules: [
			{ test: /\.(png|jpg)$/, use: ["file-loader"] },
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/env"],
						plugins: ["transform-class-properties"]
					}
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
			chunkFilename: "[id].css"
		}),
		new CleanWebpackPlugin("doc"),
		new HtmlWebpackPlugin({
			hash: true,
			cache: true,
			title: "Hello World",
			template: "./index.html"
		}),
		new HtmlMinifierPlugin({
			html5: true,
			collapseWhitespace: true
		})
	]
};
