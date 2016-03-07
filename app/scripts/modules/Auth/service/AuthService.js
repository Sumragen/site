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
        service.signIn = function (currentLogin, currentPassword, callback) {
            console.log('signIn');
            $http.post('/signIn', {login: currentLogin, password: currentPassword}).then(function () {
                console.log('post signIn');
                service.error = null;
                callback();
            }, function () {
                if (localStorage.getItem('currentUserLS')) {
                    service.error = null;
                    callback();
                } else {
                    service.error = "Username or password is incorrect";
                    callback();
                }
            });
        };
        return service;
    }]);
});