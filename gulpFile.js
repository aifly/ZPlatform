var gulp = require('gulp'),
	babel= require('gulp-babel'),
	less = require('gulp-less'),
	livereload = require('gulp-livereload'),
	cssmin = require("gulp-minify-css"),
    watch = require("gulp-watch"),
    plumber = require('gulp-plumber');


gulp.task("cssminify", function () {
	return gulp.src("index.css")
		.pipe(cssmin())
		.pipe(gulp.dest("")).pipe(livereload());
});
gulp.task("lessc", function () {
	gulp.src("index.less")
		.pipe(less())
		.pipe(gulp.dest("statices/css"))
		.pipe(livereload());
});

gulp.task("compileEs6",function(){
	return gulp.src('index.es6')
		.pipe(plumber())
		.pipe(babel({presets:['es2015']}))
		.pipe(gulp.dest('statices/js'));
});



gulp.task("watch", function (file) {
    livereload.listen();
    livereload.changed(file.path);
    gulp.watch('*.es6', ['compileEs6']);
	gulp.watch('*.less', ['lessc']);
    gulp.watch('*.css', ['cssminify']);
});


gulp.task('default', ['watch'], function () {
    gulp.start('compileEs6');
	//  gulp.start('lessc','cssminify','compileEs6');
});