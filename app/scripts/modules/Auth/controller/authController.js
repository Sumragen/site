/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', [
        '$scope',
        //'close',
        '$http',
        '$uibModalInstance',
        '$q',
        '$state',
        '$timeout',
        'AuthService',
        function ($scope, $http, $uibModalInstance, $q, $state, $timeout, authService) {
            var self = this;

            $scope.login = {
                schema: {
                    type: 'object',
                    properties: {
                        username: {type: 'string'},
                        password: {type: 'string'}
                    }
                },
                form: [
                    {
                        key: 'username',
                        title: 'Username'
                    },
                    {
                        key: 'password',
                        type: 'password',
                        title: 'Password'
                    }
                ],
                model: {}
            };
            $scope.signUp = {
                schema: {
                    type: 'object',
                    properties: {
                        username: {type: 'string'},
                        password: {type: 'string'},
                        email: {type: 'string'},
                        first_name: {type: 'string'},
                        last_name: {type: 'string'}
                    }
                },
                form: [
                    {
                        key: 'first_name',
                        title: 'First name'
                    },
                    {
                        key: 'last_name',
                        title: 'Last name'
                    },
                    {
                        key: 'username',
                        title: 'Username'
                    },
                    {
                        key: 'password',
                        type: 'password',
                        title: 'Password'
                    },
                    {
                        key: 'email',
                        type: 'email',
                        title: 'Email'
                    }
                ],
                model: {}
            };
            $scope.cancel = function () {
                $scope.busy = true;
                $uibModalInstance.dismiss('cancel');
                $scope.busy = false;
            };

            self.signUp = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    authService.signUp($scope.signUp.model);
                    $scope.busy = false;
                    $uibModalInstance.close();
                }
            };

            self.signIn = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    authService.signIn($scope.login.model).then(function (user) {
                        $scope.error = null;
                        $scope.busy = false;
                        $uibModalInstance.close();
                    }, function (err) {
                        $scope.busy = false;
                        $scope.error = err.data.message;
                    });
                }
            };
        }]);
});