/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Profile.ProfileController', [
        'Common.SecurityContext',
        function (SecurityContext) {
            var self = this;
            var currentUser = SecurityContext.getPrincipal();
            self.firstName = currentUser.firstName;
            self.lastName = currentUser.lastName;
            self.login = currentUser.login;
            self.email = currentUser.email;
        }]);
});