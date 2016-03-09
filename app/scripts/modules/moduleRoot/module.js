/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'], function (module) {
    var app = module.module('RootModule', ['LogicifyGMap', 'Common', 'ngAnimate','ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                views:{
                    header: {
                        templateUrl: './views/header.html'
                    },
                    body: {
                        templateUrl: './views/home.html'
                    }
                },
                controller: ''
            })
            .state('tab_1', {
                url: "/profile",
                views:{
                    header: {
                        templateUrl: './views/header.html'
                    },
                    body: {
                        templateUrl: './views/tabs/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'ctrl'
                    }
                },
                templateUrl: "./views/tabs/profile.html"
            })
            .state('tab_2', {
                url: "/schedule",
                views:{
                    header: {
                        templateUrl: './views/header.html'
                    },
                    body: {
                        templateUrl: './views/tabs/schedule.html'
                    }
                },
                controller: 'RootController'
            })
            .state('tab_3', {
                url: "/events",
                views:{
                    header: {
                        templateUrl: './views/header.html'
                    },
                    body: {
                        templateUrl: './views/tabs/events.html'
                    }
                },
                controller: 'RootController'
            })
            .state('master', {
                url: "/master",
                templateUrl: "./views/master.html",
                controller: ''
            });
    });
    return app;
});