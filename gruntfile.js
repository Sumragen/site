/**
 * Created by trainee on 2/25/16.
 */
/*global module,require*/
module.exports = function(grunt){
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
            'copy:tmp',
            'less',
            //'requirejs',
            'processhtml',
            'less:development'
        ]);
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'build',
            'connect:livereload',
            //'processhtml',
            'watch'
        ]);
    });

    grunt.registerTask('copyFiles',function (){
       grunt.task.run([
           'copy:files'
       ]);
    });
};