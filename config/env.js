/**
 * Created by artem on 11/9/15.
 */
var environments = {
    dev: {
        showVersionInfo: true,
        siteUrl: 'http://0.0.0.0:9000',
        apiUrl: 'http://localhost:9002',
        useHeaderAuth: false,
        useCookiesAuth: false,
        useFakeAPIService: true,
        minimizeJs: false,
        minimizeCss: false,
        generateSourceMaps: true
    },
    dist: {
        showVersionInfo: true,
        siteUrl: 'http://0.0.0.0:9000',
        apiUrl: 'http://localhost:9002',
        useHeaderAuth: false,
        useCookiesAuth: false,
        useFakeAPIService: false,
        minimizeJs: true,
        minimizeCss: true,
        generateSourceMaps: true
    },
    default:{
        showVersionInfo: true,
        siteUrl: 'http://0.0.0.0:9000',
        apiUrl: 'http://localhost:9002',
        useHeaderAuth: false,
        useCookiesAuth: false,
        useFakeAPIService: false,
        minimizeJs: false,
        minimizeCss: false,
        generateSourceMaps: true
    }
};
var _ = require('lodash');
module.exports = function (grunt, config) {
    var currentEnvName = config.buildMeta.environment;
    var defaults = {
        siteUrl: '',
        apiUrl: 'http://localhost:9002',
        useFakeAPIService: false,
        minimizeJs: true,
        minimizeCss: true,
        generateSourceMaps: false
    };
    environments = _.forOwn(environments, function (e) {
        e = _.defaults(e, defaults);
    });
    if (!environments[currentEnvName]) {
        grunt.fail.fatal('Environment ' + currentEnvName + "doesn't exist. Possible options are: " + _.keys(environments));
    }
    var env = environments[currentEnvName];
    env.build = config.buildMeta;
    // Write environment settings into file
    env.amdModule = 'define([], function() { return ' + JSON.stringify(env) + ' })';
    grunt.file.write(config.appConfig.server + '/scripts/Env.js', env.amdModule);
    return env;
};
