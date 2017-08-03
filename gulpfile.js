var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');

// gulp.task('mr', function(){
// 	console.log('555');
// });



gulp.task('sass', function(){
	return gulp.src([
		'app/sass/**/*.scss',
		'app/sass/**/*.sass'
		])
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js'			
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['sass'], function(){
	return gulp.src([
			'app/css/libs.css'			
		])
	.pipe(cssnano())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/css'))
});

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir:'app'
		},
		notify:false

	});
});

gulp.task('clean', function(){
	return del.sync('dist');
})
gulp.task('clear', function(){
	return cache.clearAll();
})
 gulp.task('img', function(){
 	return gulp.src('app/img/**/*')
 	.pipe(cache(imagemin({
 		interlaced:true,
 		progressive:true,
 		svgoPlugins:[{removeViewBox:false}],
 		une:[pngquant()]
 	})))
 	.pipe(gulp.dest('dist/img'));
 })
gulp.task('watch', ['browser-sync', 'css-libs','scripts'], function(){
	gulp.watch('app/sass/**/*.scss',['sass']);
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});


gulp.task('bild', ['clean', 'img', 'sass', 'scripts'], function(){
	var bildcss = gulp.src([
		'app/css/style.css',
		'app/css/libs.min.css'
		])
		.pipe(gulp.dest('dist/css'));

	var bildfont = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var bildjs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var bildhtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))
})
