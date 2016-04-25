/**
 * Created by trainee on 3/22/16.
 */
define(['../module'], function (module) {
    module.service('Dashboard.Profile.ProfileService', [
        '$http',
        '$q',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, $q, Endpoint, securityContext) {
            var service = {};

            service.loadUsers = function (offset, limit) {
                return $http(Endpoint.user.list(offset, limit))
                    .then(function (users) {
                        return users.data.users;
                    });
            };

            service.updateUser = function (user) {
                return $http(Endpoint.user.update(user))
                    .then(function (data) {
                        if (JSON.parse(localStorage.getItem('currentUserLS')).id === data.data.user.id) securityContext.setPrincipal(data.data.user);
                        return data.data.users;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});