const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
console.log("process.env.MODE", process.env.NODE_ENV);
//pass environment mode to mode
module.exports = (env) => {
	let Base_URL = "";
	let mode = "";

	if (env.development) {
		mode = "development";
		Base_URL = "api.staging.development";
	}

	if (env.uat) {
		mode = "uat";
		Base_URL = "";
	}

	if (env.production) {
		mode = "production";
		Base_URL = "";
	}
	return {
		mode,
		entry: "./src/index.js",
		target: "web",
		output: {
			path: path.join(__dirname, "build"),
			filename: "js/main.js",
			publicPath: "/",
		},
		devtool: "source-map",
		devServer: {
			hot: true,
			historyApiFallback: true,
			open: false,
			port: 3001,
			// proxy:{
			//   "/v1":{
			//     "target": "https://api.staging.quilt.vogdevelopment.com",
			//     changeOrigin: true,
			//   }
			// }
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"~": path.resolve(__dirname, "node_modules"),
			},
			extensions: [".tsx", ".ts", ".js", ".json"],
		},
		module: {
			rules: [
				{
					test: /(j|t)sx?/,
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: [
							["@babel/plugin-transform-runtime"],
							// ["import", { libraryName: 'antd', style: 'css' }]
						],
					},
					include: path.resolve("src"),
					exclude: /node_modules/,
				},
				{
					test: /\.less/,
					use: [
						"style-loader",
						{ loader: "css-loader", options: { importLoaders: 3 } },
						"less-loader",
					],
				},
				{
					test: /\.css/,
					use: [
						"style-loader",
						{
							loader: "css-loader",
							options: { importLoaders: 1 },
						},
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: ["autoprefixer"],
								},
							},
						},
					],
				},
				{
					test: /\.(jpg|png|gif|svg|jpeg)/,
					loader: "url-loader",
					options: {
						limit: 30000,
						name: "img/[name].[hash:6].[ext]",
						esModule: false,
					},
					type: "javascript/auto",
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./public/index.html",
				favicon: "./public/favicon.ico",
				manifest: "./public/manifest.json",
			}),
			new webpack.DefinePlugin({
				"process.env": {
					MODE: JSON.stringify(mode),
					BASE_URL: JSON.stringify(Base_URL),
				},
			}),
		],
	};
};
