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
        function ($scope, $http, authService, $uibModalInstance, $q, $state) {
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
                $uibModalInstance.dismiss('cancel');
            };

            self.signUp = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    authService.signUp($scope.signUp.model);
                    $uibModalInstance.close();
                }
            };

            self.signIn = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    authService.signIn($scope.sf.model).then(function (user) {
                        $scope.error = null;
                        $uibModalInstance.close();
                    }, function (err) {
                        $scope.error = err.data.message;
                    });
                }
            };
        }]);
});