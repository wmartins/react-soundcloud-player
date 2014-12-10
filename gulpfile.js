var gulp = require('gulp');

require('./tasks/build');
require('./tasks/dist');
require('./tasks/watch');

gulp.task('default', ['build']);
