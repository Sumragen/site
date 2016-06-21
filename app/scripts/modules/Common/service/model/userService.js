/**
 * Created by trainee on 6/21/16.
 */
define(['../../module'], function (module) {
    module.service('Common.Model.UserService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};
            //CRUD
            service.createUser = function () {
                return $http(Endpoint.user.post())
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getUserById = function (id) {
                return $http(Endpoint.user.get(id))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getUsers = function (offset, limit) {
                return $http(Endpoint.user.list(offset, limit))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.updateUser = function (user) {
                return $http(Endpoint.user.put(user))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.deleteUser = function (id) {
                return $http(Endpoint.user.delete(id))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});