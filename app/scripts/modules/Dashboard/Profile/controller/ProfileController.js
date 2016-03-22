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
                currentUser = user;
                self.firstName = currentUser.firstName;
                self.lastName = currentUser.lastName;
                self.login = currentUser.login;
                self.email = currentUser.email;
            });

            self.showSchemaForm = false;
            self.toggleSchemaForm = function () {
                self.showSchemaForm = !self.showSchemaForm;
            };

            self.editProfile = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if(form.$valid){

                }
                profileService.editUser({
                    user:$scope.profile,
                    currentData: {
                        login: currentUser.login,
                        email: currentUser.email
                }
                }).then(function () {
                    self.toggleSchemaForm();
                }, function () {
                    //some code
                });
            };

            $scope.schema = {
                type: "object",
                properties: {
                    firstName: { type: "string", minLength: 2, title: "First Name", description: "Your first name" },
                    lastName: { type: "string", minLength: 2, title: "Last Name", description: "Your last name" },
                    login: { type: "string", minLength: 4, title: "Login", description: "Your login" },
                    email: { type: "string", minLength: 4, title: "Email", description: "Your email" }
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