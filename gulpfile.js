/*jshint camelcase: false */
'use strict';

//=============================================
//               DEPENDENCIES
//=============================================

/**
 * Load required dependencies.
 */
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

/**
 * Load Gulp plugins listed in 'package.json' and attaches
 * them to the `$` variable.
 */
/*jshint -W079*/ //for using $
var $ = require('gulp-load-plugins')();

//=============================================
//            DECLARE VARIABLES
//=============================================

/**
 * Declare variables that are use in gulpfile.js
 */
var log = $.util.log;
var envArgv = $.util.env;
var ENV = !!envArgv.env ? envArgv.env : 'dev';
var COLORS = $.util.colors;

//=============================================
//            PRINT INFO MESSAGE
//=============================================
log(COLORS.blue('********** RUNNING IN ' + ENV + ' ENVIROMENT **********'));


//=============================================
//            UTILS FUNCTIONS
//=============================================

function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}

function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return COLORS.yellow(data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference);
}

function startBrowserSync(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;

    browserSync({
        files: files,
        host: '172.16.16.144',
        port: 3000,
        notify: false,
        open: false,
        server: {
            baseDir: baseDir
        },
        browser: browser
    });
}

//=============================================
//            DECLARE PATHS
//=============================================

var paths = {
    /**
     * The 'gulpfile' file is where our run tasks are hold.
     */
    gulpfile: 'gulpfile.js',
    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks.
     *
     * - 'styles'       contains all project css styles
     * - 'images'       contains all project images
     * - 'scripts'      contains all project javascript except config-env.js and unit test files
     * - 'html'         contains main html files
     * - 'templates'    contains all project html templates
     * - 'config'       contains Angular app config files
     */
    app: {
        basePath: 'src/',
        stylesMain: 'src/styles/main.scss',
        styles: 'src/styles/**/*.scss',
        images: 'src/images/**/*.{png,gif,jpg,jpeg}',
        config: {
            dev: 'src/app/core/config/core.config.dev.js',
            test: 'src/app/core/config/core.config.test.js',
            prod: 'src/app/core/config/core.config.prod.js'
        },
        scripts: ['src/app/**/*.js',
            '!src/app/**/*.spec.js'
        ],
        html: 'src/index.html',
        templates: 'src/app/**/*.html'
    },
    /**
     * The 'tmp' folder is where our html templates are compiled to JavaScript during
     * the build process and then they are concatenating with all other js files and
     * copy to 'dist' folder.
     */
    tmp: {
        basePath: '.tmp/',
        styles: '.tmp/styles/',
        scripts: '.tmp/scripts/'
    },
    /**
     * The 'build' folder is where our app resides once it's
     * completely built.
     *
     * - 'dist'         application distribution source code
     * - 'docs'         application documentation
     */
    build: {
        basePath: 'build/',
        dist: {
            basePath: 'build/dist/',
            fonts: 'build/dist/fonts/',
            images: 'build/dist/images/',
            styles: 'build/dist/styles/',
            scripts: 'build/dist/scripts/'
        },
        docs: 'build/docs/'
    }
};


//=============================================
//                HELPER
//=============================================

/**
 * Add the ability to provide help text to custom gulp tasks. Usage: `gulp help`
 */
$.help(gulp);


//=============================================
//               SUB TASKS
//=============================================

/**
 * The 'clean' task delete 'build' and '.tmp' directories.
 */
gulp.task('clean', 'Delete \'build\' and \'.tmp\' directories', function (cb) {
    var files = [].concat(paths.build.basePath, paths.tmp.basePath);
    log('Cleaning: ' + COLORS.blue(files));

    return del(files, cb);
});

/**
 * The 'jshint' task defines the rules of our hinter as well as which files
 * we should check. It helps to detect errors and potential problems in our
 * JavaScript code.
 */
gulp.task('jshint', 'Hint JavaScripts files', function () {
    return gulp.src(paths.app.scripts.concat(paths.gulpfile))
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

/**
 * The 'htmlhint' task defines the rules of our hinter as well as which files we
 * should check. It helps to detect errors and potential problems in our
 * HTML code.
 */
gulp.task('htmlhint', 'Hint HTML files', function () {
    return gulp.src([paths.app.html, paths.app.templates])
        .pipe($.htmlhint('.htmlhintrc'))
        .pipe($.htmlhint.reporter())
        .pipe($.htmlhint.failReporter());
});

/**
 * Compile SASS files into the main.css.
 */
gulp.task('sass', 'Compile sass files into the main.css', function () {
    // if it's set to `true` the gulp.watch will keep gulp from stopping
    // every time we mess up sass files
    var errLogToConsole = ENV === 'dev' || ENV === 'test';
    return gulp.src([paths.app.stylesMain, './jspm_packages/github/zurb/foundation*/scss/foundation.scss'])
        .pipe($.changed(paths.tmp.styles, {extension: '.scss'}))
        .pipe($.sourcemaps.init())
        .pipe($.sass({style: 'compressed', errLogToConsole: errLogToConsole}))
        .pipe($.autoprefixer('last 2 version'))
        .pipe($.concat('main.css'))
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.tmp.styles))
        .pipe($.filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Create JS production bundle.
 */
gulp.task('bundle', 'Create JS production bundle', ['jshint'], function (cb) {
    var Builder = require('systemjs-builder');
    var builder = new Builder();

    builder.loadConfig('./jspm.config.js')
        .then(function () {
            builder.buildSFX('src/app/main', paths.tmp.scripts + 'build.js', {
                sourceMaps: true,
                config: {sourceRoot: paths.tmp.scripts}
            })
                .then(function () {
                    return cb();
                })
                .catch(function (ex) {
                    cb(new Error(ex));
                });
        });
});

/**
 * The 'copy' task just copies files from A to B. We use it here
 * to copy our files that haven't been copied by other tasks
 * e.g. (favicon, etc.) into the `build/dist` directory.
 */
gulp.task('extras', 'Copy project files that haven\'t been copied by \'compile\' task e.g. (favicon, etc.) into the \'build/dist\' directory', function () {
    return gulp.src([paths.app.basePath + '*.{ico,png,txt}'])
        .pipe(gulp.dest(paths.build.dist.basePath));
});

/**
 * The 'images' task copies images to `build/dist` directory.
 */
gulp.task('images', 'Copies images to `build/dist` directory', function () {
    return gulp.src(paths.app.images)
        .pipe(gulp.dest(paths.build.dist.images))
        .pipe($.size({title: 'images'}));
});

/**
 * The 'compile' task compile all js, css and html files.
 *
 * 1. it compiles and minify html templates to js template cache
 * 2. css      - replace local path with CDN url, minify, add revision number
 *    css_libs - minify, add revision number
 *    js       - annotates the sources before minifying, minify, add revision number
 *    js_libs  - minify, add revision number
 *    html     - replace local path with CDN url, minify
 */
gulp.task('compile', 'Does the same as \'jshint\', \'htmlhint\', \'images\', \'templates\' tasks but also compile all JS, CSS and HTML files',
    ['htmlhint', 'sass', 'bundle'], function () {

        return gulp.src(paths.app.html)
            .pipe($.inject(gulp.src(paths.tmp.scripts + 'build.js', {read: false}), {
                starttag: '<!-- inject:build:js -->',
                ignorePath: [paths.app.basePath]
            }))
            .pipe($.usemin({
                css: [
                    $.bytediff.start(),
                    $.minifyCss({keepSpecialComments: 0}),
                    $.bytediff.stop(bytediffFormatter),
                    $.rev()
                ],
                js: [
                    $.bytediff.start(),
                    $.ngAnnotate({add: true, single_quotes: true, stats: true}),
                    $.uglify(),
                    $.bytediff.stop(bytediffFormatter),
                    $.rev()
                ],
                html: [
                    $.bytediff.start(),
                    $.minifyHtml({empty: true}),
                    $.bytediff.stop(bytediffFormatter)
                ]
            }))
            .pipe(gulp.dest(paths.build.dist.basePath))
            .pipe($.size({title: 'compile', showFiles: true}));
    });

/**
 * Setup config file ./src/app.config.json to include there env,serviceHost,socketHost
 */
gulp.task('config', 'setup config variables', function () {
    var fileName = './src/app.config.json',
        local = {
            env: 'development',
            serviceHost: 'http://172.16.16.114:8085'
        },
        remote = {
            env: 'development',
            serviceHost: 'http://whoappbackend-jbubsk.rhcloud.com'
        },
        content;

    if (process.env.MODE) {

        if (process.env.MODE === 'local') {
            content = JSON.stringify(local);
        } else {
            content = JSON.stringify(remote);
        }
    } else {
        content = JSON.stringify(remote);
    }
    fs.writeFileSync(fileName, content);

});

/**
 * The 'watch' task set up the checks to see if any of the files listed below
 * change, and then to execute the listed tasks when they do.
 */
gulp.task('watch', 'Watch files for changes', function () {
    // Watch images and fonts files
    gulp.watch([paths.app.images], [browserSync.reload]);

    // Watch css files
    gulp.watch(paths.app.styles, ['sass']);

    // Watch js files
    gulp.watch([paths.app.scripts, paths.gulpfile], ['jshint', browserSync.reload]);

    // Watch html files
    gulp.watch([paths.app.html, paths.app.templates], ['htmlhint', browserSync.reload]);
});

//=============================================
//                MAIN TASKS
//=============================================

//---------------------------------------------
//              DEVELOPMENT TASKS
//---------------------------------------------

/**
 * The 'serve' task serve the dev environment.
 */
gulp.task('serve', 'Serve for the dev environment', ['sass', 'config'], function () {
    startBrowserSync(['.tmp', 'src', 'jspm_packages', './']);
    // Watch images and fonts files
    gulp.watch([paths.app.images], [browserSync.reload]).on('change', browserSync.reload);

    // Watch css files
    gulp.watch(paths.app.styles, ['sass']);

    // Watch js files
    gulp.watch([paths.app.scripts, paths.gulpfile]).on('change', browserSync.reload);

    // Watch html files
    gulp.watch([paths.app.html, paths.app.templates]).on('change', browserSync.reload);
});
gulp.task('default', 'Watch files and build environment', ['serve']);

/**
 * The 'serve:dist' task serve the prod environment.
 */
gulp.task('serve:dist', 'Serve the prod environment', ['build'], function () {
    startBrowserSync([paths.build.dist.basePath]);
});

//---------------------------------------------
//               BUILD TASKS
//---------------------------------------------

/**
 * The 'build' task gets app ready for deployment by processing files
 * and put them into directory ready for production.
 */
gulp.task('build', 'Build application for deployment', function (cb) {
    runSequence(
        ['clean', 'config'],
        ['compile', 'extras', 'images'],
        cb
    );
}, {
    options: {
        'env=<environment>': 'environment flag (prod|dev|test)',
        'cdn': 'replace local path with CDN url'
    }
});