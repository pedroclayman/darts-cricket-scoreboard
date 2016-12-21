let gulp =      require('gulp');
let babel =     require('gulp-babel');
let concat =    require('gulp-concat');
let uglify =    require('gulp-uglify');
let pump =      require('pump');

gulp.task('default', ['babel'], () => {
    console.log('greetings from default');
});

gulp.task('babel', () => {
    return pump([
        gulp.src('app/**.js'),
        babel({
            presets: ['es2015']
        }),
        concat("raw/darts.js"),
        gulp.dest('dist')
    ]);
});

gulp.task('watch', () => {
    return gulp.watch([
        'app/**.js'
    ], ['default']);
});