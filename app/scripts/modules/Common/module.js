/**
 * Created by trainee on 3/2/16.
 */
define(['angular', 'angular-animate'], function (module) {
    return module.module('Common', ['mgcrea.ngStrap', 'ngAnimate'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
            $stateProvider
                .state('dashboard', {
                    url: "",
                    abstract: true,
                    templateUrl: './views/master.html',
                    controller: 'CommonController as controller'
                })
                .state('dashboard.home', {
                    url: "/home",
                    templateUrl: './views/home.html',
                    controller: ''

                });
        });
});