/**
 * Created by sumragen on 2/29/16.
 */
require.config({
    paths: {
        'async': '../../bower_components/requirejs-plugins/src/async',
        'angular': '../../bower_components/angular/angular',
        'angular-strap': '../../bower_components/angular-strap/dist/angular-strap.min',
        'angular-strap-tpl': '../../bower_components/angular-strap/dist/angular-strap.tpl.min',
        'angular-animate': '../../bower_components/angular-animate/angular-animate',
        'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
        'angular-moment': '../../bower_components/angular-moment/angular-moment',
        'angular-touch': '../../bower_components/angular-touch/angular-touch',
        'angular-ui-calendar': '../../bower_components/angular-ui-calendar/src/calendar',
        'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
        'angular-ui-select': '../../bower_components/ui-select/dist/select',
        'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
        'bootstrap-decorator': '../../bower_components/angular-schema-form/dist/bootstrap-decorator',
        'bootstrapDateTimePicker': '../../bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'jquery': '../../bower_components/jquery/dist/jquery',
        'lodash': '../../bower_components/lodash/lodash',
        'twitter-bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap',
        'logicify-gmap': '../../bower_components/logicify-gmap/dist/logicify-gmap',
        'ui.bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap',
        'ui.bootstrap.tpls': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'schemaForm': '../../bower_components/angular-schema-form/dist/schema-form',
        'moment': '../../bower_components/moment/min/moment.min',
        'fullcalendar': '../../bower_components/fullcalendar/dist/fullcalendar',
        'ripples': '../../bower_components/bootstrap-material-design/dist/js/ripples',
        'material': '../../bower_components/bootstrap-material-design/dist/js/material',
        'tv4': '../../bower_components/tv4/tv4',
        'objectpath': '../../bower_components/objectpath/lib/ObjectPath',
        'arrive': '../../bower_components/arrive/src/arrive',
        'angular-growl-v2': '../../bower_components/angular-growl-v2/build/angular-growl',
        'infiniteScroll': '../../bower_components/ngInfiniteScroll/build/ng-infinite-scroll',
        'jqueryWatermark': '../../bower_components/watermark/dist/jquery.watermark',
        'angular-progressbar': '../../bower_components/angular-svg-round-progressbar/build/roundProgress',
        'recorder': '../../bower_components/recorderjs/recorder',
        'angular-file-upload' : '../../bower_components/ng-file-upload/ng-file-upload',
        'angular-file-upload-shim' : '../../bower_components/ng-file-upload/ng-file-upload-shim',
        'microsoftApi': 'http://js.live.net/v5.0/wl',
        'googleApi': 'https://apis.google.com/js/client.js?onload=handleClientLoad',
        'google': 'https://maps.googleapis.com/maps/api/js?v=3.24&libraries=places&key=AIzaSyB2I-5q7CdsT5Kx1hQMuEgWiWCH_0U_7Ts'
    },
    shim: {
        'angular-file-upload':{
            deps: ['angular-file-upload-shim']
        },
        'angular-file-upload-shim':{
            deps: ['angular']
        },
        'angular-progressbar': {
            deps: ['angular']
        },
        'jqueryWatermark': {
            deps: ['jquery']
        },
        'angular-growl-v2': {
            deps: ['angular']
        },
        'googleApi': {
            deps: [],
            exports: 'gapi'
        },
        'angular-ui-select': {
            deps: ['angular']
        },
        'bootstrapDateTimePicker': {
            deps: ['jquery', 'moment', 'twitter-bootstrap']
        },
        'infiniteScroll': {
            deps: ['angular', 'jquery']
        },
        'bootstrap-decorator': {
            deps: ['schemaForm']
        },
        'schemaForm': {
            deps: ['angular-sanitize', 'tv4', 'objectpath']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'material': {
            deps: ['twitter-bootstrap', 'ripples', 'arrive']
        },
        arrive: {
            deps: ['jquery'],
            exports: 'arrive'
        },
        'ripples': {
            deps: ['jquery']
        },
        'angular-ui-calendar': {
            deps: ['angular', 'fullcalendar']
        },
        'fullcalendar': {
            deps: ['jquery', 'moment']
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-strap': {
            deps: ['angular']
        },

        'angular-touch': {
            deps: ['angular']
        },
        'angular-moment': {
            deps: ['moment']
        },
        'moment': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'angular-strap-tpl': {
            deps: ['angular-strap', 'angular-strap']
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
            deps: ['angular', 'google'],
            exports: 'Autocomplite'
        }
    }
});


require(['angular', 'jquery', 'material', './fakeBackend', 'angular-growl-v2', './App', './setup'], function (angular, jquery, material) {
    $.material.init();
    angular.bootstrap(document, ['MyApp']);
});