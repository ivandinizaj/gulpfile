'use strict';

// Include project requirements.
var env       = require('minimist')(process.argv.slice(2)),
  gulp        = require('gulp'),
  $           = require('gulp-load-plugins')(),
  path        = require('path'),
  del         = require('del'),
  fs          = require('fs'),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence'),
  reload      = browserSync.reload;
    
var paths = {

    allJadeFiles : 'src/templates/**/*.jade',
    jadeFiles: 'src/templates/*.jade',
    distJade : 'dist/',

    minifyFiles: ['src/scripts/**/*.js', '!src/scripts/**/_*.js', '!src/scripts/**/APP*.js'],
    lintFiles: ['src/scripts/**/*.js', '!src/scripts/vendor/**/*.js'],
    
    allSrcFiles: 'src/scripts/**/*.js',
    distFolder: 'dist/scripts',

    allStylesFiles :  'src/styles/**/*.sass'  ,
    ignoreStylesFiles : '!src/styles/**/_*.sass',
    stylesFolder: 'src/styles/',
    cssFolder: 'dist/styles',

    fontsFiles: 'src/fonts/**/*.{ttf,eot,svg,woff,woff2}',
    fontsFolder: 'dist/fonts',

    otimizeFiles : ['src/images/**/*.{png,jpg,gif,ico}', '!src/images/**/_*.{png,jpg,gif,ico}' ],
    imgFolder : 'dist/images',

    locateFiles: 'locate/*.json',

    cleanFiles : 'dist/**/*'

}

var doneNotify = function(message){

  message = message != null?  message : 'Task complete' ;

  return {  
    title: 'Done',
    onLast: true,
    message: message 
  };

};

//error notification settings for plumber
var plumberErrorHandler = function(title, message){

  title = title ? 'Gulp Error': title;
  message = message ? "Error: <%= error.message %>" : message ;

  return { 
    errorHandler: $.notify.onError({
      title: title,
      message: message,
      icon: path.join(__dirname, 'gulp.png')
    })
  };
};

// Watch files for changes & reload
gulp.task('serve',['watch'],function () {
  
  var files = [
      'dist/**/*.html',
      'dist/styles/**/*.css',
      'dist/images/**/*',
      'dist/scripts/**/*.js',
      'dist/fonts/*',
      'locate/*.json',
  ];

  browserSync(files,{
    notify: false,
    logPrefix: 'BS',
    server: {
      baseDir: 'dist',
      index: 'index.html',
      tunnel: true
    }
  });

});

gulp.task('styles', function() {
  
  var sassOptions = {
    style: (env.p ? 'compressed' : 'expanded'),
    comments: false,
    css: paths.cssFolder,
    sass: paths.stylesFolder,
    image: path.imgFolder,
    font: path.fontsFolder
  };

  return gulp.src([ paths.allStylesFiles, paths.ignoreStylesFiles ])
    .pipe( $.plumber( plumberErrorHandler ) )
    .pipe( $.compass( sassOptions ) )
    .pipe( $.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe( gulp.dest( paths.cssFolder ) )
    .pipe( $.notify( doneNotify ) 
    );

});

gulp.task('jade', function(){

  return gulp.src( paths.jadeFiles )
    .pipe( $.plumber() )
    .pipe( $.data(function(file) {
      var JsonName    = path.basename(file.path, '.jade') + '.json';
      var file        = path.resolve( './locate/', JsonName );
      return fs.existsSync( file ) ? JSON.parse( fs.readFileSync(file, 'utf8') ) : {};
    }))
    .pipe( $.jade({ pretty: !env.p }) )
    .pipe( gulp.dest( paths.distJade ) )
    .pipe( $.notify(doneNotify) );

});

gulp.task('lint', function() {

  return gulp.src(paths.lintFiles)
    .pipe( $.jshint() )
    .pipe( $.jshint.reporter('default') );

});

gulp.task('minify', function() {

  return gulp.src(paths.minifyFiles)
    .pipe( $.plumber() )
    .pipe( $.imports() )
    .pipe( $.if(env.p, $.uglify()) )
    .pipe( gulp.dest( paths.distFolder ) );

});

gulp.task('fonts', function () {

  return gulp.src(paths.fontsFiles)
    .pipe( $.plumber() )
    .pipe( gulp.dest(paths.fontsFolder) )
    .pipe( $.notify(doneNotify) );

});

gulp.task( 'optimize', function () {

  return gulp.src( paths.otimizeFiles )
    .pipe( $.plumber() )     
    .pipe( $.cache( $.imagemin({optimizationLevel: 3, progressive: true, interlaced: true }) ) )
    .pipe( gulp.dest( paths.imgFolder ) )
    .pipe( $.notify(doneNotify) );

});

// Clean
gulp.task('clean', function(cb) {
  del(path.cleanFiles, cb);
  //$.notify(doneNotify);
});

// Call Watch
gulp.task('watch', function(){

  gulp.watch( paths.allJadeFiles, ['jade'] );
  gulp.watch( paths.otimizeFiles );
  gulp.watch( paths.locateFiles,['jade'] );
  gulp.watch( paths.allSrcFiles, ['lint','minify'] );
  gulp.watch( paths.allStylesFiles, ['styles'] );

});

// Build production files, the default task
gulp.task('default', function (cb) {

  runSequence( 'jade','styles','minify','lint','fonts','optimize',cb );

});