/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Profile.ProfileController', [
        '$scope',
        '$rootScope',
        '$timeout',
        'Common.SecurityContext',
        'Dashboard.Profile.ProfileService',
        'Common.PermissionsService',
        function ($scope, $rootScope, $timeout, SecurityContext, profileService, permissionsService) {
            var self = this;
            var currentUser;
            $scope.busy = true;
            var teacher = [0x001,0x003,0x004,0x007,0x00b,0x00c,0x00d,0x00e];

            $timeout(function () {
                currentUser = SecurityContext.getPrincipal();
                $scope.currentUser = currentUser;
                console.log(permissionsService.hasPermissions( null , teacher));
                $scope.busy = false;
            }, 0);

            $rootScope.$on('securityContext:updated', function (e, user) {
                $scope.currentUser = currentUser;
            });

            self.showSchemaForm = false;
            self.toggleShowSchemaForm = function () {
                $timeout(function () {
                    $scope.currentUser = SecurityContext.getPrincipal();
                    self.showSchemaForm = !self.showSchemaForm;
                });
            };

            self.editProfile = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    profileService.updateUser($scope.currentUser)
                        .then(function () {
                            self.toggleShowSchemaForm();
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