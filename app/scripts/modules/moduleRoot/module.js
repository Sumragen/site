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
                templateUrl: "./views/home.html",
                controller: ''
            })
            .state('tab_1', {
                url: "/profile",
                templateUrl: "./views/tabs/profile.html",
                controller: ''
            })
            .state('tab_2', {
                url: "/schedule",
                templateUrl: "./views/tabs/schedule.html",
                controller: ''
            })
            .state('tab_3', {
                url: "/events",
                templateUrl: "./views/tabs/events.html",
                controller: ''
            });
    });
    return app;
});