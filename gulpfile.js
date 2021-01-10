'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('assets/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});
 
gulp.task('watch', function () {
  // gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/sass/**/*.scss', gulp.series('sass'))
});