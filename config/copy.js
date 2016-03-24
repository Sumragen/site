/**
 * Created by sumragen on 3/10/16.
 */
module.exports = {
    html:{
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: '.tmp/'
    },
    fonts:{
        expand: true,
        cwd: 'app/fonts',
        src: '**/*.*',
        dest: '.tmp/fonts'
    },
    images:{
        expand: true,
        cwd: 'app/images',
        src: '**/*.{ico,png,jpeg}',
        dest: '.tmp/images'
    },
    requirejs:{
        expand: true,
        cwd: 'bower_components/requirejs/',
        src: 'require.js',
        dest: '.tmp/vendor/requirejs'
    }
};