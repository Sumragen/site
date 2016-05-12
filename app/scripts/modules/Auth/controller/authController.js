/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('AuthController', [
        '$scope',
        '$http',
        '$uibModalInstance',
        '$q',
        '$state',
        '$uibModal',
        '$timeout',
        'AuthService',
        'GoogleProviderService',
        'FacebookProviderService',
        'MicrosoftProviderService',
        'PinterestProviderService',
        'userData',
        function ($scope, $http, $uibModalInstance, $q, $state, $uibModal, $timeout, authService, googleProviderService, facebookProviderService, microsoftProviderService, pinterestProviderService, userData) {
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
                model: userData || {}
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.signUp = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    authService.signUp($scope.signUp.model)
                        .then(function () {
                            $uibModalInstance.close();
                        })
                        .catch(function (err) {

                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };
            self.signIn = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    authService.signIn($scope.login.model)
                        .then(function () {
                            $scope.error = null;
                            $uibModalInstance.close();
                        })
                        .catch(function (err) {
                            $scope.error = err.data.message;
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };
            function openSignUpModalWithUser(user){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "../views/Auth/signUp.html",
                    controller: "AuthController as controller",
                    resolve: {
                        userData: user
                    }
                });
                modalInstance.result
                    .then(function () {
                        $state.go('dashboard.profile');
                    }, function () {
                        //catch error
                    });
            }
            $scope.googleAuthButtonClick = function () {
                $scope.busy = true;
                googleProviderService.authenticate()
                    .then(function () {
                        $scope.error = null;
                    })
                    .catch(function (err) {
                        openSignUpModalWithUser(err);
                    })
                    .finally(function () {
                        $uibModalInstance.close();
                        $scope.busy = false;
                    });
            };
            $scope.facebookAuthButtonClick = function () {
                $scope.busy = true;
                facebookProviderService.authenticate()
                    .then(function () {
                        $scope.error = null;
                    })
                    .catch(function (err) {
                        openSignUpModalWithUser(err);
                    })
                    .finally(function () {
                        $uibModalInstance.close();
                        $scope.busy = false;
                    })
            };
            $scope.microsoftAuthButtonClick = function () {
                $scope.busy = true;
                microsoftProviderService.authenticate()
                    .then(function () {
                        $scope.error = null;
                    })
                    .catch(function (err) {
                        openSignUpModalWithUser(err);
                    })
                    .finally(function () {
                        $uibModalInstance.close();
                        $scope.busy = false;
                    })
            };
            $scope.pinterestAuthButtonClick = function () {
                pinterestProviderService.authenticate();
            };
            googleProviderService.initApiKey();
        }]);
});