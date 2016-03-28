/**
 * Created by sumragen on 3/10/16.
 */
module.exports = {
    dist: {
        files: [
            {
                expand: true,
                dot: true,
                cwd: '<%= appConfig.app %>',
                dest: '<%= appConfig.dist %>',
                src: ['*.{ico,png,txt}',
                    '.htaccess',
                    '*.html',
                    'views/**/*.html',
                    'images/**/*',
                    'fonts/**/.*'
                ]
            },
            {
                expand: true,
                cwd: 'bower_components/bootstrap/dist',
                src: 'fonts/*',
                dest: '<%= appConfig.dist %>'
            }, {
                expand: true,
                dot: true,
                cwd: 'bower_components',
                src: 'requirejs/*.js',
                dest: '<%= appConfig.dist %>/vendor/'
            }]
    },
    html: {
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: '.tmp/'
    },
    fonts: {
        expand: true,
        cwd: 'app/fonts',
        src: '**/*.*',
        dest: '.tmp/fonts'
    },
    images: {
        expand: true,
        cwd: 'app/images',
        src: '**/*.{ico,png,jpeg}',
        dest: '.tmp/images'
    },
    requirejs: {
        expand: true,
        cwd: 'bower_components/requirejs/',
        src: 'require.js',
        dest: '.tmp/vendor/requirejs'
    }
};