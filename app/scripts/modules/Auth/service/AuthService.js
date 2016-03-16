/**
 * Created by trainee on 3/4/16.
 */
define(['../module'], function (module) {
    module.service('AuthService', ['$http', '$q', 'Endpoint', function ($http, $q, Endpoint) {
        var service = {
            role: null,
            error: null
        };

        service.signUp = function (newUser) {
            return $http(Endpoint.users.list({
                firstName : newUser.FirstName,
                lastName : newUser.LastName,
                login : newUser.Login,
                email : newUser.Email,
                password : newUser.Psw
            }));
        };

        service.signIn = function (userIn) {
            return $http(Endpoint.signIn.user(userIn))
                .then(function (data) {
                return data.data.currentUser;
            }, function (err) {
                return $q.reject(err);
            });
        };
        return service;
    }]);
});