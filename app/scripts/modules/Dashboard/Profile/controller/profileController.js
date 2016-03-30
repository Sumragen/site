/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Profile.ProfileController', [
        'Common.SecurityContext',
        '$scope',
        'Dashboard.Profile.ProfileService',
        '$rootScope',
        function (SecurityContext, $scope, profileService, $rootScope) {
            var self = this;
            var currentUser = SecurityContext.getPrincipal();
            $scope.currentUser = currentUser;


            $rootScope.$on('securityContext:updated', function (e, user) {
                $scope.currentUser = currentUser;
            });

            self.showSchemaForm = false;
            self.toggleShowSchemaForm = function () {
                self.showSchemaForm = !self.showSchemaForm;
            };

            self.editProfile = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    profileService.updateUser({
                        user: $scope.profile,
                        id: currentUser.id
                    }).then(function () {
                        self.toggleShowSchemaForm();
                    }, function () {
                        //some code
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
                    key: 'avatar',
                    title: 'Upload avatar',
                    type: 'fileinput',
                    fileType: 'dataUrl'
                }
            ];

            $scope.profile = $scope.currentUser || {};
        }
    ]);
});