//'use strict';

const dir = {
        build: './ravens/'
    },
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    cleanCss = require('gulp-clean-css');

styles = () => {
    return gulp.src("./sass/*.scss")
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({browsers: ['last 7 versions'], cascade: true}))
        .pipe(cssnano()) 
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCss())
        .pipe(gulp.dest(dir.build + "assets/css"))
        .pipe(browserSync.stream());
},

    watch = () => {
        browserSync.init({
            proxy: "http://7-ravens.pf.by/",
            notify: true
        });

        gulp.watch('./sass/*.scss', styles);
        gulp.watch("./**/*.php").on('change', browserSync.reload);
        gulp.watch("./**/*.js").on('change', browserSync.reload);
    };

gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('clearcache', function () {
    return cache.clearAll();
});

gulp.task('default', gulp.parallel('styles', 'watch', 'clearcache'));