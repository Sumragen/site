/**
 * Created by sumragen on 3/10/16.
 */
module.exports = function (grunt, appConfig) {
    var _ = require('lodash');
    var defaults = {
        options: {
            uglify2: {
                mangle: false
            },
            baseUrl: '<%= appConfig.app %>/scripts',
            mainConfigFile: '<%= appConfig.app %>/scripts/entrypoint.js',
            optimize: appConfig.env.minimizeJs ? 'uglify2' : 'none',
            generateSourceMaps: appConfig.env.generateSourceMaps,
            name: 'entrypoint',
            out: '<%= appConfig.dist %>/scripts/main.min.js',
            preserveLicenseComments: false,
            findNestedDependencies: true,
            rawText: {
                'Env': '<%= env.amdModule %>'
            }
        }
    };


    return {
        server: _.merge(_.cloneDeep(defaults), {
            out: '<%= appConfig.server %>/scripts/main.min.js'
        }),
        dist: defaults

    }
};