/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Settings.Users.UsersController', [
        '$scope',
        '$timeout',
        'Dashboard.Profile.ProfileService',
        'usersData',
        function ($scope, $timeout, profileService, usersData) {
            var self = this;
            $scope.users = usersData;

            self.showSchemaForm = false;
            self.toggleShowSchemaForm = function (user) {
                $timeout(function () {
                    $scope.selectedUser = user;
                    self.showSchemaForm = !self.showSchemaForm;
                });
            };

            self.editProfile = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    profileService.updateUser($scope.selectedUser)
                        .then(function () {
                            self.toggleShowSchemaForm($scope.selectedUser);
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.schema = {
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
                    }
                },
                "required": [
                    "first_name",
                    "last_name",
                    "username",
                    "email"
                ]
            };

            $scope.form = [
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
                }
            ];
        }
    ]);
});