var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('build:dev', shell.task([
    'node build/dev-server.js'
]));

gulp.task('build:prod', shell.task([
    'node build/build.js'
]));
