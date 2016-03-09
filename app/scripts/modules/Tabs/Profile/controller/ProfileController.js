/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('ProfileController', [ function () {
        var self = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUserLS'));
        self.firstName = currentUser.firstName;
        self.lastName = currentUser.lastName;
        self.login = currentUser.login;
        self.email = currentUser.email;
    }]);
});