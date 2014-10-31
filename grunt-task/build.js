module.exports = function (grunt) {
	/**
	 * Assets creation and minifization
	 */
	//Build External UI Library minified js (METRONIC dependancies)
	grunt.registerTask('build', 'Create stamplay-ng.min.js', [
		'ngAnnotate:js',
		'uglify:output',
		'copy:templates'
	]);
}