/**
 * Created by trainee on 3/4/16.
 */
define(['../module'], function (module) {
    module.factory('AuthService', ['$http','$q', function ($http,$q) {
        var service = {
            role: null,
            error: null
        };

        service.addUser = function (newUser, newLogin, newPsw) {
            console.log('add user');
            $http.post('/users', {
                'name': newUser,
                'login': newLogin,
                'password': newPsw,
                'avatar': ""
            });
        };

        service.signIn = function (currentLogin, currentPassword) {
            return $http.post('/signIn', {login: currentLogin, password: currentPassword})
                .then(function (currentUser) {
                    return currentUser;
                },function (err) {
                    return $q.reject(err);
            });
        };
        return service;
    }]);
});