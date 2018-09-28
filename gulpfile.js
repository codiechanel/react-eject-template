// Sass configuration
var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('sass', function() {
  gulp
    .src('./src/**/*.scss')
    // .src('*.scss')
    .pipe(
      sass({
        includePaths: ['node_modules'],
      })
    )
    .pipe(
      gulp.dest(function(f) {
        return f.base
      })
    )
})

gulp.task('default', ['sass'], function() {
  // gulp.watch('*.scss', ['sass'])
  gulp.watch('./src/**/*.scss', ['sass'])
})
