const
	path = require('path'),
	webpack = require('webpack');

module.exports = {
	cache  : true,
	context: path.resolve(__dirname),
	devtool: false,
	entry  : {app: './BaldAuth/index'},

	module: {
		noParse: /\.min\.js/,

		loaders: [
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				query  : require('./babel'),
				exclude: /node_modules/
			},

			{
				test: /\.css$/,

				loaders: [
					'style-loader?sourceMap',
					'css-loader?modules&camelCase=dashes&importLoaders=1&localIdentName=[local]__[hash:base64:5]'
				]
			},

			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=1024'},
			{test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader'}
		]
	},

	output: {
		filename     : 'bald-auth.min.js',
		path         : path.join(__dirname, 'build'),
		libraryTarget: 'commonjs2',
		pathinfo     : false,
		publicPath   : '/'
	},

	performance: {hints: false},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false, screw_ie8: true}})
	],

	resolve: {
		extensions: ['.json', '.js'],

		modules: [
			path.resolve(__dirname, 'node_modules')
		]
	},

	stats: {colors: true},
	target: 'web'
};
