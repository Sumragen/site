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

            service.signUp = function (newUser) {
                return $http(Endpoint.users.list({
                    firstName: newUser.FirstName,
                    lastName: newUser.LastName,
                    login: newUser.Login,
                    email: newUser.Email,
                    password: newUser.Psw
                }));
            };

            service.signIn = function (userIn) {
                return $http(Endpoint.signIn.user(userIn))
                    .then(function (data) {
                        return securityContext.setPrincipal(data.data.currentUser);
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});