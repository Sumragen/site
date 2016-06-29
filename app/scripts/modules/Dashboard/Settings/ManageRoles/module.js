/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.ManageRoles', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.manageRoles', {
                    url: "/manageRoles",
                    templateUrl: 'views/Dashboard/Settings/ManageRoles/manageRoles.html',
                    controller: 'Dashboard.Settings.ManageRoles.ManageRolesController as controller',
                    resolve: {
                        rolesData: function (Endpoint, $http, $q) {
                            return $http(Endpoint.role.list())
                                .then(function (res) {
                                    return res.data;
                                }, function (err) {
                                    return $q.reject(err);
                                });
                        }
                    }
                });
        });
});