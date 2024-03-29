// Modules
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const babel = require('gulp-babel')
const modRewrite = require('connect-modrewrite')
const cleanCss = require('gulp-clean-css')

// File paths
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js'
};

// Sass task: compiles .scss to .css
function scssTask() {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(concat('styles.css'))
        .pipe(dest('dist'))
}

// JS task: transpiles and minifies scripts
function jsTask() {
    return src(files.jsPath)
        .pipe(babel())
        .pipe(terser())
        .pipe(dest('dist'))
}


// Browsersync to spin up a local server
function browserSyncServe(cb) {
    // Initializes browsersync server
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 0,
                bottom:'auto',
            },
        },
        middleware: [
            modRewrite([
                // Set MIME type for JavaScript files
                '^/dist/.*\\.js$ - [T=application/javascript]'
            ])
        ]
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch CSCC and JS files for changes
// When changed, run scss and js tasks simultaneously
function watchTask() {
    watch(
        [files.jsPath, files.scssPath],
        // { interval: 1000, userPolling: true }, // Makes docker work (?)
        parallel(scssTask, jsTask));
}

// Browsersync Watch task
// Watch HTML file for changes and reload browsersync server
// // Watch SCSS and JS files for changes, run scss and js tasks simultaneously, update browsersync
function bsWatchTask() {
    watch(['index.html', 'horarios/index.html', 'reservaciones/index.html', '/contacto/index.html', 'signup/index.html', 'carreras/index.html', 'carta/index.html', 'historia/index.html', 'admin/index.html'], browsersyncReload);
    watch(
        [files.jsPath, files.scssPath],
        // { interval: 1000, userPolling: true },
        series(parallel(scssTask, jsTask), browsersyncReload)
    );
}

// Export the default Gulp task, so it can be run
// Runs the scss and js tasks simultaneously
// Then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask),
    browserSyncServe,
    bsWatchTask
);

exports.build = series(
    scssTask, jsTask
)


