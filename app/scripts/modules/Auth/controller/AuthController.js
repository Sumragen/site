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
                .then(function (currentUser) {
                    $scope.error = null;
                    self.close();
                }, function (err) {
                    $scope.error = err.data.message;
                });
        };
    }]);
});