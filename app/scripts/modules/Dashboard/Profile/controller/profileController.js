/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Profile.ProfileController', [
        '$scope',
        '$timeout',
        'Common.SecurityContext',
        'Common.NotificationService',
        'Dashboard.Profile.ProfileService',
        function ($scope, $timeout, securityContext, notificationService, profileService) {
            $scope.user = {};

            function updateUserModel(user) {
                profileService.getFullUserData(user ? user.id : securityContext.getPrincipal().id)
                    .then(function (user) {
                        $scope.user.model = user;
                        if (!user.password) {
                            $scope.errorReadPassword = true;
                        }
                    });
            }

            $timeout(function () {
                updateUserModel();
            });

            $scope.$on('securityContext:updated', function (e, user) {
                updateUserModel(user);
            });

            $scope.showSchemaForm = false;
            $scope.toggleShowSchemaForm = function () {
                $timeout(function () {
                    updateUserModel();
                    $scope.showSchemaForm = !$scope.showSchemaForm;
                });
            };

            $scope.editProfile = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    profileService.updateUser($scope.user.model)
                        .then(function () {
                            notificationService.showMessage('Changes were saved', 'success');
                            $scope.errorReadPassword = false;
                            $scope.toggleShowSchemaForm();
                        })
                        .catch(function (err) {
                            notificationService.showMessage(err.message, 'error');
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.user.schema = {
                "type": "object",
                "properties": {
                    first_name: {
                        type: "string",
                        minLength: 4,
                        title: "First Name"
                    },
                    last_name: {
                        type: "string",
                        minLength: 4,
                        title: "Last Name"
                    },
                    username: {
                        type: "string",
                        minLength: 4,
                        title: "Login"
                    },
                    "email": {
                        "title": "Email",
                        "type": "string",
                        "pattern": "^\\S+@\\S+$"
                    },
                    'avatar': {
                        type: 'file'
                    },
                    'password': {
                        title: 'Password',
                        minLength: 4,
                        'type': 'string'
                    }
                },
                "required": [
                    "first_name",
                    "last_name",
                    "username",
                    "email",
                    'password'
                ]
            };

            $scope.user.form = [
                {
                    key: 'avatar',
                    title: 'Upload avatar',
                    type: 'fileinput',
                    fileType: 'dataUrl',
                    previewType: 'image',
                    accept: 'image/png,image/jpeg',
                    onFileSelect: null
                },
                {
                    "key": "first_name",
                    "placeholder": "First name"

                },
                {
                    "key": "last_name",
                    "placeholder": "Last name"
                },
                {
                    "key": "username",
                    "placeholder": "username"
                },
                {
                    "key": "email",
                    "placeholder": "email"
                },
                {
                    'key': 'password',
                    type: 'password',
                    'placeholder': 'Password'
                }
            ];
        }
    ]);
});