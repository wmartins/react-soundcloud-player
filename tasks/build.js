var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify'),
    browserify = require('browserify');

gulp.task('build', function() {
    browserify({
        entries: ['./src/js/main.jsx'],
        transform: ['reactify'],
        extensions: ['.jsx']
    }).bundle().
    pipe(source('bundle.js')).
    pipe(gulp.dest('./dest/js'));
});
