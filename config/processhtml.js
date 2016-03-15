/**
 * Created by artem on 11/20/15.
 */
module.exports = function (grunt, appConfig) {
    return {
        options: {
            data:{
                requireJsBaseUrl: appConfig.env.minimizeJs ? './' : './scripts',
                mainJsUrl: appConfig.env.minimizeJs ? 'scripts/main.min.js' : 'scripts/entrypoint.js',
                mainCssUrl: appConfig.env.minimizeCss ? 'styles/main.min.css' : 'styles/main.css'
            }
        },
        dev: {
            files: {
                '.tmp/index.html': ['app/index.html']
            }
        }
    }
};