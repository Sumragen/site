/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    AuthController.$inject = [
        '$scope',
        '$uibModalInstance',
        '$state',
        'AuthService',
        'GoogleOAuthProviderService',
        'FacebookOAuthProviderService',
        'MicrosoftOAuthProviderService',
        'userData'
    ];
    AuthController.$name = 'AuthController';
    function AuthController($scope, $uibModalInstance, $state, authService, googleOAuthProviderService, facebookOAuthProviderService, microsoftOAuthProviderService, userData) {
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
                    title: 'Username or email'
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
        $scope.signUpByDataFromSocialNetwork = function(user){
            authService.signUpByDataFromSocialNetwork(user)
                .then(function () {
                    $uibModalInstance.close();
                    $state.go('dashboard.profile');
                })
                .finally(function () {
                    $scope.busy = false;
                });
        };



        $scope.googleAuthButtonClick = function () {
            $scope.busy = true;
            googleOAuthProviderService.authenticate()
                .then(function () {
                    $scope.error = null;
                })
                .catch(function (err) {
                    $scope.signUpByDataFromSocialNetwork(err);
                })
                .finally(function () {
                    $uibModalInstance.close();
                    $scope.busy = false;
                });
        };
        $scope.facebookAuthButtonClick = function () {
            $scope.busy = true;
            facebookOAuthProviderService.authenticate()
                .then(function () {
                    $scope.error = null;
                })
                .catch(function (err) {
                    $scope.signUpByDataFromSocialNetwork(err);
                })
                .finally(function () {
                    $uibModalInstance.close();
                    $scope.busy = false;
                })
        };
        $scope.microsoftAuthButtonClick = function () {
            $scope.busy = true;
            microsoftOAuthProviderService.authenticate()
                .then(function () {
                    $scope.error = null;
                    $uibModalInstance.close();
                })
                .catch(function (err) {
                    if (!err.error) {
                        $scope.signUpByDataFromSocialNetwork(err);
                    }
                })
                .finally(function () {
                    $scope.busy = false;
                })
        };
        googleOAuthProviderService.initApiKey();
    }

    module.controller(AuthController.$name, AuthController);
});