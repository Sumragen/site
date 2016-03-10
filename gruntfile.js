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
        },
        copy:{
            files:{
                expand: true,
                cwd: 'app/scripts',
                src: '**/*.js',
                dest: 'test'
            }
        },
        jshint:{
            options: {
                reporter: require('jshint-stylish')
            },

            main: [
                'app/scripts/*/**.js'
            ]
        },
        watch: {
            js: {
                files: ['app/scripts/**/*.js'],
                tasks: ['jshint','copy'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    };

    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('serve', function () {
        grunt.task.run([
            //'livereload',
            'watch'
        ]);
    });

    grunt.registerTask('copyFiles',function (){
       grunt.task.run([
           'copy:files'
       ]);
    });
};