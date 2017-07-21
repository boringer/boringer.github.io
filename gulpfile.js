const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function copy(type) {
	return (done) => {
		const typePath = paths[type];
		gulp.src(typePath.src)
			.pipe(gulp.dest(typePath.dest));
		done();
	};
}

function js(done) {
	gulp.src(paths.js.src)
		.pipe(webpackStream(require('./webpack.config.js'), webpack))
		.pipe(babel({
			presets: [
				'env',
				'stage-2'
			]
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dest));
	done();
}

function watch() {
	gulp.watch(paths.html.watch, html);
	gulp.watch(paths.js.watch, js);
}

const html = copy('html');

const paths = {
	html: {
		src: './src/*.html',
		watch: './src/*.html',
		dest: './',
	},
	js: {
		src: './src/js/app.js',
		watch: './src/js/*.js',
		dest: './js/',
	}
};

gulp.task('default', gulp.parallel(html, js));
gulp.task('watch', gulp.series('default', watch));