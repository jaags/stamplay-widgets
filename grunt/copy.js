module.exports = {
	templates: {
		expand: true,
		flatten: true,
		src: [
			'./directives/*/*',
			'./directives/stamplay.js',
			'./services/*',
			'./libs/*',
			'./module.js'
			
		],
		dest: 'dist/',
		filter: 'isFile'
	},
};