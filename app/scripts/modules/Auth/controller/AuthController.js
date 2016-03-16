/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', ['$scope', 'close', '$http', 'AuthService', '$q', '$state', function ($scope, close, $http, AuthService, $q, $state) {
        var self = this;

        self.close = close;

        self.stateProfile = function () {
            $state.go('dashboard.profile');
        };

        self.signUp = function (newUser) {
            AuthService.signUp(newUser);
            self.close();
        };

        self.signIn = function (userIn) {
            return AuthService.signIn(userIn)
                .then(function (currentUser) {
                    $scope.error = null;
                    self.stateProfile();
                    self.close();
                }, function (err) {
                    $scope.error = err.data.message;
                });
        };
    }]);
});