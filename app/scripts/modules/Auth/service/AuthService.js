/**
 * Created by trainee on 3/4/16.
 */
define(['../module'], function (module) {
    module.factory('AuthService', ['$http','$q', function ($http,$q) {
        var service = {
            role: null,
            error: null
        };

        service.addUser = function (newFirstName, newLastName, newLogin, newEmail, newPsw){
            console.log('add user');
            $http.post('/users', {
                firstName : newFirstName,
                lastName : newLastName,
                login : newLogin,
                email : newEmail,
                password : newPsw
            });
        };

        service.signIn = function (currentLogin, currentPassword) {
            return $http.post('/signIn', {login: currentLogin, password: currentPassword})
                .then(function (data) {
                    console.log(data.data.sessionToken);
                    return data.data.currentUser;
                },function (err) {
                    return $q.reject(err);
            });
        };
        return service;
    }]);
});