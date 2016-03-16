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
            //$http({
            //    method: 'POST',
            //    url: '/users',
            //    isApiCall: true,
            //    data: {
            //        firstName : newUser.FirstName,
            //        lastName : newUser.LastName,
            //        login : newUser.Login,
            //        email : newUser.Email,
            //        password : newUser.Psw
            //    }
            //});
        };

        service.signIn = function (currentLogin, currentPassword) {
            return $http({
                method: 'POST',
                url: '/signIn',
                isApiCall: true,
                data: {
                    login: currentLogin,
                    password: currentPassword
                }
            }).then(function (data) {
                //console.log(data.data.sessionToken);
                return data.data.currentUser;
            }, function (err) {
                return $q.reject(err);
            });
        };
        return service;
    }]);
});