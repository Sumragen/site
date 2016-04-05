/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Settings.ManageRoles',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('settings.manageRoles', {
                    url: "/manageRoles",
                    templateUrl: 'views/Settings/ManageRoles/manageRoles.html',
                    controller: 'Settings.ManageRoles.ManageRolesController as controller',
                    //resolve: {
                    //    eventsData: function (Endpoint, $http, $q) {
                    //        return $http(Endpoint.events.list())
                    //            .then(function (data) {
                    //                return data;
                    //            }, function (err) {
                    //                return $q.reject(err);
                    //            });
                    //    }
                    //}
                });
        });
});