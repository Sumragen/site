/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('ProfileModule',[])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.profile', {
                    url: "/profile",
                    templateUrl: './views/tabs/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'ctrl'
                });
        });

});