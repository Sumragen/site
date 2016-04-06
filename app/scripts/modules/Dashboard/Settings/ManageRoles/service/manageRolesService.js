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
                    .then(function (data) {
                        return data.data;
                    });
            };
            service.updateRole = function (currentRole) {
                return $http(Endpoint.role.update(currentRole))
                    .then(function (data) {
                        return data.data;
                    });
            };
            service.deleteRole = function (currentRole) {
                return $http(Endpoint.role.delete(currentRole))
                    .then(function (data) {
                        return data.data;
                    });
            };
            return service;
        }]);
});