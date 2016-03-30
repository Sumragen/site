/**
 * Created by trainee on 3/2/16.
 */
define(['angular', 'angular-animate'], function (module) {
    return module.module('Common', ['mgcrea.ngStrap', 'ngAnimate','LogicifyGMap', 'Common', 'ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('common', {
                    url: "/anonymous",
                    abstract: true,
                    templateUrl: './views/common/nonauth.html',
                    controller: 'Common.MasterController as controller',
                    data: {
                        redirect: function (user) {
                            if(user) return 'dashboard.profile';
                        }
                    }
                })
                .state('common.home', {
                    url: "/home",
                    templateUrl: '../../../views/Dashboard/home.html'
                });
        });
});