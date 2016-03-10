/**
 * Created by trainee on 3/10/16.
 */
module.exports = {
    js: {
        files: ['../app/scripts/**/*.js'],
        tasks: ['jshint','copy'],
        options: {
            spawn: false,
            livereload: true
        }
    }
};