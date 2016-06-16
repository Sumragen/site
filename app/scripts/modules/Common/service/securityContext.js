/**
 * Created by trainee on 3/17/16.
 */
define(['../module'], function (module) {
    module.service('Common.SecurityContext', [
        '$rootScope',
        function ($rootScope) {
            var service = {};
            service.getPrincipal = function () {
                return JSON.parse(localStorage.getItem('currentUserLS'));
            };
            service.setPrincipal = function (user) {
                $rootScope.$broadcast('securityContext:updated', user);
                user ? localStorage.setItem('currentUserLS', JSON.stringify(user))
                     : localStorage.removeItem('currentUserLS');
                return user;
            };
            service.getSessionID = function () {
                return localStorage.getItem('sessionID');
            };
            service.setSessionID = function (id) {
                localStorage.setItem('sessionID', id);
                return id;
            };
            return service;
        }
    ]);
});