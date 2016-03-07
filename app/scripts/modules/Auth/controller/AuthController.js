/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', ['$scope', 'close', '$http', 'AuthService', '$q', function ($scope, close, $http, AuthService, $q) {
        var self = this;

        self.close = close;

        self.addUser = function (newUser, newLogin, newPsw) {
            AuthService.addUser(newUser, newLogin, newPsw);
        };

        self.signIn = function (currentLogin, currentPassword) {
            return AuthService.signIn(currentLogin, currentPassword)
                .then(function () {
                    if (!AuthService.error) {
                        $scope.error = null;
                        self.close();
                    } else {
                        $scope.error = AuthService.error;
                    }
                });
        };
    }]);
});