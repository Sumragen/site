/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', [
        '$scope',
        //'close',
        '$http',
        'AuthService',
        '$uibModalInstance',
        '$q',
        '$state',
        function ($scope,  $http, AuthService, $uibModalInstance, $q, $state) {
            var self = this;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            self.signUp = function (newUser) {
                AuthService.signUp(newUser);
                $uibModalInstance.close();
            };

            self.signIn = function (userIn) {
                return AuthService.signIn(userIn)
                    .then(function (currentUser) {
                        $scope.error = null;
                        $uibModalInstance.close();
                    }, function (err) {
                        $scope.error = err.data.message;
                    });
            };
        }]);
});