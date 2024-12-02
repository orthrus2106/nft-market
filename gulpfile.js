const {src, dest, watch, parallel, series} = require('gulp')

const scss = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const fileInclude = require('gulp-file-include')

function html() {
    return src('app/*.html') // Исходные HTML-файлы
        .pipe(fileInclude({
            prefix: '@@', // Префикс для вставки (например, @@include)
            basepath: '@file' // Путь для шаблонов относительно файла
        }))
        .pipe(dest('dist')) // Готовые файлы будут в dist/
        .pipe(browserSync.stream());
}

function scripts(){
    return src([
        'app/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js')) // Для разработки
    .pipe(dest('dist/js')) // Для production
    .pipe(browserSync.stream());
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], cascade: false }))
        .pipe(dest('app/css')) // Сохраняем для разработки
        .pipe(dest('dist/css')) // Сохраняем для production
        .pipe(browserSync.stream());
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html'], html);
}

function browersync(){
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
}

function building() {
    return src([
        'app/css/style.min.css', // Указываем путь к скомпилированным стилям
        'app/js/main.min.js',    // JS
        'app/*.html',             // HTML
        'app/assets/**/*'           // Images
    ], { base: 'app' })
    .pipe(dest('dist'));
}

// function cleanDist(){
//     return src('dist')
//     .pipe(clean)
// }

function cleanDist(){
    return src('dist', {read: false, allowEmpty: true})
        .pipe(clean());
}

exports.styles = styles
exports.scripts = scripts
exports.watching = watching
exports.browersync = browersync
exports.html = html

exports.build = series(cleanDist, building)
exports.default = parallel(html, styles, scripts, browersync, watching) // чтобы browsersync и watching работали вместе