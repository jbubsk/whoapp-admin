'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {
	src: 'src',
	dist: 'dist',
	tmp: '.tmp',
	e2e: 'e2e',
	errorHandler: function (title) {
		return function (err) {
			gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
			this.emit('end');
		};
	},
	wiredep: {
		directory: 'bower_components',
		exclude: [/foundation\.js/, /foundation\.css/]
	}
};

// read gulp dir and require each file with tasks
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
	return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
	require('./gulp/' + file)(options);
});

// main default task
gulp.task('default', ['clean'], function () {
	gulp.start('build');
});
