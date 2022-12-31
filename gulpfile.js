// Modules
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();

// File paths
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js'
};

// Sass task: compiles .scss to .css
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())   // Compiles to .css
        .pipe(postcss([autoprefixer(), cssnano()])) // Optimize with postprocessor
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist')); // Put final CSS in dist folder
}

// JS task: concatenates and minifies scripts
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(dest('dist'));
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
                top: 'auto',
                bottom: 0,
            },
        },
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
    watch(['index.html', 'hours.html', 'reservations.html'], browsersyncReload);
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


