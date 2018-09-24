const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

gulp.task('scss', () => {
    return gulp
        .src('dev/scss/**/*.scss')
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 versions', '>1%', 'ie 8'], {
                cascade: true
            })
        )
        .pipe(
            csso({
                restructure: true
            })
        )
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', () =>
    gulp
        .src(['dev/js/libs/*.js', 'dev/js/*.js'])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('default', ['browser-sync', 'scss', 'scripts'], () => {
    gulp.watch('dev/js/*.js', ['scripts']);
    gulp.watch('dev/scss/**/*.scss', ['scss']);
    gulp.watch('dist/*.html', browserSync.reload);
});
