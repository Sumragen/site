/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', ['$scope', 'close', '$http', 'AuthService', '$q', '$state', function ($scope, close, $http, AuthService, $q, $state) {
        var self = this;




        self.signUp = function (newUser) {
            AuthService.signUp(newUser);
            close();
        };

        self.signIn = function (userIn) {
            return AuthService.signIn(userIn)
                .then(function (currentUser) {
                    $scope.error = null;
                    close();
                }, function (err) {
                    $scope.error = err.data.message;
                });
        };
    }]);
});