/**
 * Created by trainee on 3/10/16.
 */
module.exports = {
    js: {
        files: ['./scripts/**/*.js'],
        tasks: ['jshint'],
        options: {
            spawn: false,
            livereload: 15727
        }
    },
    views: {
        files: ['<%= appConfig.app %>/**/*.html'],
        tasks: ['copy:html','processhtml'],
        options: {
            livereload: true
        }
    },
    less: {
        files: ['<%= appConfig.app %>/styles/*.less'],
        tasks: ['less:development'],
        options: {
            livereload: true
        }
    }
};