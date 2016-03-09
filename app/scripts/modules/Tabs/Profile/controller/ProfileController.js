/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('ProfileController', [ function () {
        var self = this;
        self.count = 4;
        //var currentUser = JSON.parse(localStorage.getItem('currentUserLS'));
        self.getName = function () {
            var user = JSON.parse(localStorage.getItem("currentUserLS"));
            return user.login;
        };
    }]);
});