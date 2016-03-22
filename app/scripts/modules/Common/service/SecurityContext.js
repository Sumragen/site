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
                localStorage.setItem('currentUserLS', JSON.stringify(user));
                return user;
            };
            return service;
        }
    ]);
});