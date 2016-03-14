/**
 * Created by sumragen on 2/29/16.
 */
require.config({
    paths: {
        'async': '../../bower_components/requirejs-plugins/src/async',
        'angular': '../../bower_components/angular/angular',
        'jquery': '../../bower_components/jquery/dist/jquery',
        'twitter-bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap',
        'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
        'logicify-gmap': '../../bower_components/logicify-gmap/dist/logicify-gmap',
        'ui.bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap',
        'ui.bootstrap.tpls': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-strap': '../../bower_components/angular-strap/dist/angular-strap.min',
        'angular-strap-tpl': '../../bower_components/angular-strap/dist/angular-strap.tpl.min',
        'angular-animate':'../../bower_components/angular-animate/angular-animate',
        'angular-mocks':'../../bower_components/angular-mocks/angular-mocks',
        'google': 'https://maps.googleapis.com/maps/api/js?v=3.22'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-strap': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'angular-strap-tpl': {
            deps: ['angular-strap','angular-strap']
        },
        googlemaps: {
            params: {
                key: 'AIzaSyBgbkIo3Sm5Xt9mV3DILlczDSYUwsSKfrU'
            }
        },
        'ui.bootstrap': {
            deps: ['angular']
        },
        'ui.bootstrap.tpls': {
            deps: ['ui.bootstrap']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'twitter-bootstrap': {
            deps: ['jquery']
        },
        'jquery': {
            deps: []
        },
        google: {
            exports: 'google'
        },
        'logicify-gmap': {
            deps: ['angular', 'google']
        }
    }
});


require(['angular','./fakeBackend' ,'./App'], function (angular) {
    angular.bootstrap(document, ['MyApp']);
});