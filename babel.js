module.exports = {
	babelrc: false,
	cacheDirectory: true,

	presets: [
		require.resolve('babel-preset-latest'),
		require.resolve('babel-preset-react')
	],

	plugins: [
		require.resolve('babel-plugin-transform-function-bind'),
		require.resolve('babel-plugin-transform-export-extensions')
	],

	env: {
		production: {
			plugins: [
				require.resolve('babel-plugin-transform-react-remove-prop-types')
			]
		}
	}
};
