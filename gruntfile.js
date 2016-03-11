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
            environment: grunt.option('env') || 'dev',
            noCache:grunt.option('nocache') || Date.now()
        }
    };

    config = require('load-grunt-configs')(grunt, config);
    grunt.initConfig(config);
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-requirejs');
    //grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', function () {
        grunt.task.run([
            'copy',
            'less:development',
            'requirejs'
        ]);
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'connect',
            'watch'
        ]);
    });

    grunt.registerTask('copyFiles',function (){
       grunt.task.run([
           'copy:files'
       ]);
    });
};