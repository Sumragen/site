/**
 * Created by trainee on 4/6/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Settings.ManageRolesService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};
            service.createRole = function (currentRole) {
                return $http(Endpoint.role.post(currentRole))
                    .then(function (res) {
                        return res.data;
                    });
            };
            service.updateRole = function (role) {
                return $http(Endpoint.role.put(role))
                    .then(function (res) {
                        return res.data;
                    });
            };
            service.deleteRole = function (currentRole) {
                return $http(Endpoint.role.delete(currentRole))
                    .then(function (res) {
                        return res.data;
                    });
            };
            return service;
        }]);
});