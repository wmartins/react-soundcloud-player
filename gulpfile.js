var gulp = require('gulp');

require('./tasks/build');
require('./tasks/watch');

gulp.task('default', ['build']);
