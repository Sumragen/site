/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'], function (module) {
    return module.module('LocationModule', ['LogicifyGMap', 'Common', 'ngAnimate','ui.router'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.location', {
                    url: "/location",
                    templateUrl: './views/tabs/location.html',
                    controller: 'LocateCtrl',
                    controllerAs: 'controller'
                });
        });
});