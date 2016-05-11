/**
 * Created by trainee on 3/4/16.
 */
define(['../module'], function (module) {
    module.service('AuthService', [
        '$http',
        '$q',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, $q, Endpoint, securityContext) {
            var service = {
                role: null,
                error: null
            };

            service.signUp = function (user) {
                return $http(Endpoint.auth.register(user))
                    .then(function (data) {
                        return securityContext.setPrincipal(data.data.currentUser);
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };

            service.signIn = function (user) {
                return $http(Endpoint.auth.login(user))
                    .then(function (data) {
                        return securityContext.setPrincipal(data.data.currentUser);
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});