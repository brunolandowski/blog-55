var gulp = require('gulp');

var watch = require('gulp-watch');
var sass = require('gulp-sass');
var shell = require('gulp-shell')
var bs = require('browser-sync').create();


var paths = {
    'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
    'style': {
        all: './public/styles/**/*.scss',
        output: './public/styles/'
    }
};

gulp.task('sass', function(){
    gulp.src(paths.style.all)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.style.output))
    .pipe(bs.stream());
});

gulp.task('watch:sass', function () {
    gulp.watch(paths.style.all, ['sass']);
});

gulp.task('browser-sync', function(){
  bs.init({
    proxy: 'http://localhost:3010',
    port: '4000'
  });
});

gulp.task('runKeystone', shell.task('node keystone.js'));

gulp.task('watch', ['watch:sass']);
gulp.task('default', ['watch', 'runKeystone', 'browser-sync']);