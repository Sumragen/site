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
                    firstName: {
                        type: "string",
                        minLength: 4,
                        title: "First Name",
                        description: "Your first name",
                        validationMessage: "Please, enter correct first name"
                    },
                    lastName: {
                        type: "string",
                        minLength: 4,
                        title: "Last Name",
                        description: "Your last name",
                        validationMessage: "Please, enter correct last name"
                    },
                    login: {
                        type: "string",
                        minLength: 4,
                        title: "Login",
                        description: "Your login",
                        validationMessage: "Please, enter correct login"
                    },
                    "email": {
                        "title": "Email",
                        "type": "string",
                        "pattern": "^\\S+@\\S+$",
                        "description": "Your email",
                        validationMessage: "Please, enter correct email address"
                    }
                },
                "required": [
                    "firstName",
                    "lastName",
                    "login",
                    "email"
                ]
            };

            $scope.form = [
                {
                    "key": "firstName",
                    "placeholder": "George"
                },
                {
                    "key": "lastName",
                    "placeholder": "Klimanov"
                },
                {
                    "key": "login",
                    "placeholder": "Georgeous"
                },
                {
                    "key": "email",
                    "placeholder": "Georgeous@gmail.com"
                }
            ];

            $scope.profile = $scope.currentUser || {};
        }
    ]);
});