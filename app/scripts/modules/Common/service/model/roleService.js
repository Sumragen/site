/**
 * Created by trainee on 6/21/16.
 */
define(['../../module'], function (module) {
    module.service('Common.Model.RoleService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};
            //CRUD
            service.createRole = function () {
                return $http(Endpoint.role.post())
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getRoleById = function (id) {
                return $http(Endpoint.role.get(id))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getRoles = function (offset, limit) {
                return $http(Endpoint.role.list(offset, limit))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.updateRole = function (role) {
                return $http(Endpoint.role.put(role))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.deleteRole = function (id) {
                return $http(Endpoint.role.delete(id))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});