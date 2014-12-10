var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('dist', function() {
    gulp.src('./dest/js/bundle.js').
        pipe(uglify()).
        pipe(gulp.dest('dist'));

    gulp.src('src/index.html').
        pipe(gulp.dest('./dist'));

    gulp.src(['src/css/**/*.*'], {
        base: 'src/css'
    }).pipe(gulp.dest('dist'));
});
