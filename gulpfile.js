var themename = 'ravens';

var gulp = require('gulp'),
	// Prepare and optimize code etc
	autoprefixer = require('autoprefixer'),
	browserSync = require('browser-sync').create(),
	image = require('gulp-image'),
	jshint = require('gulp-jshint'),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),

	// Only work with new or updated files
	newer = require('gulp-newer'),

	// Name of working theme folder
	root = '../' + themename + '/',
	scss = root + 'assets/sass/',
	js = root + 'assest/js/',
	img = root + 'assets/img/',
	languages = root + 'assets/languages/';

// CSS via Sass and Autoprefixer
gulp.task('css', function() {
	return gulp.src(scss + '{style.scss,rtl.scss}')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded', 
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(sourcemaps.write(scss + 'maps'))
	.pipe(gulp.dest(root + 'assets/css/style.min.css'));
});

// Optimize images through gulp-image
gulp.task('images', function() {
	return gulp.src(img + 'RAW/**/*.{jpg,JPG,png}')
	.pipe(newer(img))
	.pipe(image())
	.pipe(gulp.dest(img));
});

// JavaScript
gulp.task('javascript', function() {
	return gulp.src([js + '*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest(js + 'custom.js'));
});

// Watch everything
gulp.task('watch', function() {
    browserSync.init({ 
        open: 'external',
        proxy: '7-ravens.pf.by',
        port: 8080
    });
    gulp.watch([root + 'assets/css/**/*.css', root + 'assets/sass/**/*.scss' ], gulp.series('css'));
    gulp.watch(js + '**/*.js', gulp.series('javascript'));
    gulp.watch(img + 'RAW/**/*.{jpg,JPG,png}', gulp.series('images'));
    gulp.watch(root + '**/*').on('change', browserSync.reload);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', gulp.series('watch'));