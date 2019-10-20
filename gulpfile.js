var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');
var browserSync = require('browser-sync').create();

//autoprefixer
var prefixerOptions = {
  browsers: ['last 2 versions']
};

//browsersync
gulp.task('sass', function() {
    return gulp.src('./resources/sass/main.scss')
        .pipe(sass())
        .pipe(prefix(prefixerOptions))
        .pipe(gulp.dest('./resources/css'))
        .pipe(browserSync.stream());
});
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./resources"
    });
    gulp.watch("./resources/sass/*.scss", ['sass']);
    gulp.watch("./resources/index.html").on('change', browserSync.reload);
});
gulp.task('default', ['serve']); 

//compress images
gulp.task('build-img', function(){
    gulp.src('resources/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

//concat css
gulp.task('concat', function (){
    return gulp.src('resources/css/main.css')
    .pipe(concatCss("main.css"))
    .pipe(gulp.dest('resources/css/concat/')); 
});

//minify js
gulp.task('compress', function() {
    gulp.src('resources/js/scripts.js')
      .pipe(minify({
        ext:{
            src:'.js',
            min:'.js'
        },
      }))
      .pipe(gulp.dest('dist/js'))
  });

//minify css
gulp.task('minify-css', function(){
    return gulp.src('resources/css/concat/main.css')
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest('dist/css'));
});

//minify html
gulp.task('minify-html', function(){
    return gulp.src('resources/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});