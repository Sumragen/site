/**
 * Created by trainee on 3/17/16.
 */
define(['../module'], function (module) {
    module.service('SecurityContext', [ function () {
        var service = {};
        service.getCurrentUser = function () {
            return localStorage.getItem('currentUserLS');
        };
        service.setCurrentUser = function (user) {
            localStorage.setItem('currentUserLS', JSON.stringify(user));
        };
        return service;
    }]);
});