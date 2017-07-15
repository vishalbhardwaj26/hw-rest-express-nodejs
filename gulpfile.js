var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMochs = require('gulp-mocha');
var env = require('gulp-env');


gulp.task('default', function(){

nodemon({
    script:'app.js',
    ext:'js',
    env:{
        PORT:3000
    },
    ignore:['./node_module/**']
})
.on('restart', function(){
    console.log('restarting...');
});

});

gulp.task('test',function(){
    env({vars:{ENV:'Test'}});
    gulp.src('Tests/*.js',{read:false})
    .pipe(gulpMochs({reporter:'nyan'}));
    
});