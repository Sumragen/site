/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Profile.ProfileController', [
        '$scope',
        '$timeout',
        'Common.SecurityContext',
        'Dashboard.Profile.ProfileService',
        function ($scope, $timeout, securityContext, profileService) {
            $scope.user = {};
            //
            // function updateUserModel(user) {
            //     profileService.getFullUserData(user ? user.id : securityContext.getPrincipal().id)
            //         .then(function (user) {
            //             $scope.user.model = user;
            //             if (!user.password) {
            //                 $scope.errorReadPassword = true;
            //             }
            //         });
            // }
            //
            $timeout(function () {
                updateUserModel();
            });

            function updateUserModel (){
                $scope.user.model = securityContext.getPrincipal();
                if($scope.user.model.passwordUndefined){
                    $scope.errorReadPassword = true;
                }
            }
            $scope.$on('securityContext:updated', function (e, user) {
                $scope.user.model = user;
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
                            $scope.errorReadPassword = false;
                            $scope.toggleShowSchemaForm();
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