/**
 * Created by trainee on 2/25/16.
 */
/*global module,require*/
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    var config = {
        appConfig: {
            app: require('./bower.json').appPath || 'app',
            dist: 'dist',
            server: '.tmp'
        },
        buildMeta: {
            appVersion: grunt.file.readJSON("package.json").version,
            environment: grunt.option('env') || 'default'
        }
    };

    config = require('load-grunt-configs')(grunt, config);
    grunt.initConfig(config);

    grunt.registerTask('build', function () {
        grunt.task.run([
            'copy',
            //'requirejs',
            'processhtml',
            'less:development'
        ]);
    });

    grunt.registerTask('dist', function () {
        grunt.task.run([
            'copy:dist',
            'processhtml:dist',
            'less:dist',
            'requirejs:dist'
        ])
    });
    grunt.registerTask('serve', function () {
        grunt.task.run([
            'copy:server',
            'processhtml',
            'less:development',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('copyFiles', function () {
        grunt.task.run([
            'copy:files'
        ]);
    });
};