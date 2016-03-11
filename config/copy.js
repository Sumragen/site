/**
 * Created by sumragen on 3/10/16.
 */
module.exports = {
    tmp:{
        files:[
            {
                expand: true,
                cwd: 'app/fonts',
                src: '**/*.*',
                dest: '.tmp/fonts'
            },{
                expand: true,
                cwd: 'app/',
                src: '**/*.html',
                dest: '.tmp/'
            },{
                expand: true,
                cwd: 'app/images',
                src: '**/*.{ico,png,jpeg}',
                dest: '.tmp/images'
            },{
                expand: true,
                cwd: 'bower_components/requirejs/',
                src: 'require.js',
                dest: '.tmp/vendor/requirejs'
            }
        ]
    }
};