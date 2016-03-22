/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Profile.ProfileController', [
        'Common.SecurityContext',
        '$scope',
        function (SecurityContext, $scope) {
            var self = this;
            var currentUser = SecurityContext.getPrincipal();
            self.firstName = currentUser.firstName;
            self.lastName = currentUser.lastName;
            self.login = currentUser.login;
            self.email = currentUser.email;

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

            $scope.model = {};
        }
    ]);
});