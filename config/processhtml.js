/**
 * Created by artem on 11/20/15.
 */
module.exports = function () {
    return {
        options: {
            data:{
                requireJsBaseUrl: './scripts',
                mainJsUrl: './scripts/entrypoint.js',
                mainCssUrl: 'styles/main.css'
            }
        },
        dev: {

            files: {
                '.tmp/index.html': ['app/index.html']
            }
        }
    }
};