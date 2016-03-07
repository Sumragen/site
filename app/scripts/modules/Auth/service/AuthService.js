/**
 * Created by trainee on 3/4/16.
 */
define(['../module'], function (module) {
    module.factory('AuthService', ['$http', function ($http) {
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
            return $http.post('/signIn', {login: currentLogin, password: currentPassword}).then(
                function () {
                service.error = null;
            },
                function () {
                if (localStorage.getItem('currentUserLS')) {
                    service.error = null;
                } else {
                    service.error = "Username or password is incorrect";
                }
            });
        };
        return service;
    }]);
});