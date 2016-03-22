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

            service.editUser = function (userIn) {
                return $http(Endpoint.updateUser.user(userIn))
                    .then(function (data) {
                        return securityContext.setPrincipal(data.data);
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});