/*
* @Author: beyondouyuan
* @Date:   2018-08-10 02:50:29
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-08-10 03:16:24
*/
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
  gulp.src('static/image/**/*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('dist/static/image'))
)


gulp.task('default')
