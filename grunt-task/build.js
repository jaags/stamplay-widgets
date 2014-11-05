module.exports = function (grunt) {

	grunt.registerTask('build', 'Create stamplay-ng.min.js', [
		'clean:remove-dist',
		'ngAnnotate:js',
		'uglify:build',
		'copy:templates',
		'clean:dist'
	]);

	grunt.registerTask('build-with-map', 'Create stamplay-ng.min.js and min.map', [
		'clean:remove-dist',
		'ngAnnotate:js',
		'uglify:build-with-map',
		'copy:templates',
	]);
}