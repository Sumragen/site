/**
 * Created by trainee on 3/2/16.
 */
define(['angular', 'angular-animate'], function (module) {
    return module.module('Common', ['mgcrea.ngStrap', 'ngAnimate'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
            $stateProvider
                .state('dashboard', {
                    url: "/dashboard",
                    abstract: true,
                    templateUrl: './views/dashboard.html',
                    controller: 'AuthorizedController as controller',
                    data: {
                        redirect: function (user) {
                            console.log('auth1');
                            if(!user) return 'nonAuth.home';
                        }
                    }
                })
                .state('dashboard.home', {
                    url: "/home",
                    templateUrl: './views/home.html',
                    controller: 'CommonController as controller'

                });
        });
});