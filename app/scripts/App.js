/**
 * Created by sumragen on 2/29/16.
 */
define([
        'angular',
        'angular-ui-router',
        'logicify-gmap',
        'twitter-bootstrap',
        'angular-strap',
        'angular-strap-tpl',
        'angular-animate',
        'angular-mocks',
        'modules/Auth/index',
        'modules/moduleRoot/index',
        'modules/Common/index'
    ],
    function(angular){
        var deps = [
            'ui.router',
            'ngMockE2E',
            'AuthModule',
            'RootModule'
        ];
        var app = angular.module('MyApp', deps)
            .config(function($stateProvider, $urlRouterProvider){
                $urlRouterProvider.otherwise("/");
                $stateProvider
                    .state('routeHome', {
                        url: "/",
                        templateUrl: "./views/home.html",
                        controller:'RootController as panel'
                    });
            });
        return app;
    });