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
        requirejs: {
            compile: {
                options: {
                    baseUrl: "app/scripts",
                    mainConfigFile: "app/scripts/entrypoint.js",
                    name: "entrypoint",
                    out: "dist/main.min.js"
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["app/styles"]
                },
                files: {
                    "app/styles/main.min.css": "app/styles/main.less"
                }
            },
            production: {
                options: {
                    paths: ["app/styles"],
                    //plugins: [
                    //    new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                    //    new (require('less-plugin-clean-css'))(cleanCssOptions)
                    //],
                    //modifyVars: {
                    //    imgPath: '"http://mycdn.com/path/to/images"',
                    //    bgColor: 'red'
                    //}
                },
                files: {
                    "app/styles/main.min.css": "app/styles/main.less"
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    base: 'app/#/home'
                }
            }
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
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('serve', function () {
        grunt.task.run([
            //'livereload',
            //'less:development',
            'connect',
            'requirejs',
            'watch'
        ]);
    });

    grunt.registerTask('copyFiles',function (){
       grunt.task.run([
           'copy:files'
       ]);
    });
};