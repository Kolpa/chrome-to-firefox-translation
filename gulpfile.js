var gulp = require('gulp');
var ChromeToFirefox = require('./main.js');

gulp.task('translate', function() {
	return gulp.src('_locales/**')
	.pipe(ChromeToFirefox())
	.pipe(gulp.dest('localesFF'))
});

gulp.task('default', ['translate']);