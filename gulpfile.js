const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const terser = require('gulp-terser')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html() {
  return src('src/index.php')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist/css'))
}

function js() {
  return src('src/js/index.js')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(terser())
    //.pipe(concat('index.js'))
    .pipe(dest('dist/js'))
}

function image() {
  return src('src/image/**')
    .pipe(dest('dist/image'))
}

function composer() {
  return src('vendor/**')
    .pipe(dest('dist/vendor'))
}

function php() {
  return src('src/*.php')
    .pipe(dest('dist/'))
}

function fonts() {
  return src('src/fonts/*{ttf,woff,woff2,svg,eot}')
    .pipe(dest('dist/fonts'))
}


function clear() {
  return del('dist')
}

function server() {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/parts/**.html', series(html)).on('change', sync.reload)
  watch('src/js/**.js', series(js)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}

exports.clear = clear
exports.build = series(clear, fonts, image, composer, php, js, scss, html)
exports.server = series(clear, fonts, image, composer, php, js, scss, html, server)
