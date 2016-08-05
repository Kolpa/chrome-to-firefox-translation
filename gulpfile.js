var gulp = require('gulp');
var ChromeToFirefox = require('./main.js');
var flatten = require('gulp-flatten');

gulp.task('translate', function() {
	return gulp.src('_locales/**')
	.pipe(ChromeToFirefox())
	.pipe(flatten())
	.pipe(gulp.dest('localesFF'))
});

gulp.task('default', ['translate']);