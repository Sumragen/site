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
        watch:{
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            }
        }
    };
    grunt.initConfig(config);
    grunt.registerTask('serve', function () {
        grunt.task.run([
            //'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('copyFiles',function (){
       grunt.task.run([
           'copy:files'
       ]);
    });
};