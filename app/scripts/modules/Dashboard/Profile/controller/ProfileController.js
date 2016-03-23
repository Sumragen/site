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
                type: "object",
                properties: {
                    firstName: {type: "string", minLength: 2, title: "First Name", description: "Your first name"},
                    lastName: {type: "string", minLength: 2, title: "Last Name", description: "Your last name"},
                    login: {type: "string", minLength: 4, title: "Login", description: "Your login"},
                    email: {type: "string", minLength: 4, title: "Email", description: "Your email"}
                }
            };

            $scope.form = [
                "*",
                {
                    type: "submit",
                    title: "Save"
                }
            ];

            $scope.profile = $scope.currentUser || {};
        }
    ]);
});