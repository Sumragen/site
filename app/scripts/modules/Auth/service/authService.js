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
                        return !securityContext.getPrincipal() ? securityContext.setPrincipal(data.data.currentUser) : data.data.currentUser;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };

            service.signUpByDataFromSocialNetwork = function (user) {
                var deferred = $q.defer();
                service.signUp(user)
                    .then(function () {
                        deferred.resolve(null);
                    })
                    .catch(function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            };

            service.signIn = function (user) {
                return $http(Endpoint.auth.login(user))
                    .then(function (res) {
                        securityContext.setSessionID(res.data.sessionID);
                        return securityContext.setPrincipal(res.data.currentUser);
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});