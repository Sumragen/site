/**
 * Created by trainee on 4/4/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Common.PermissionsService', [
        '$http',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, Endpoint, securityContext) {
            var service = {};
            var permissionSet = {};
            service.getPermissionSet = function () {
                return $http(Endpoint.permission.list())
                    .then(function (res) {
                        _.each(res.data, function (permission) {
                            permissionSet[permission.code] = {
                                value: permission.id,
                                title: permission.description
                            };
                        });
                        return permissionSet;
                    })
                    .catch(function (err) {
                        return err;
                    });
            };

            // service.hasPermissions = function (checkPermissions, user) {
            //     !user ? user = securityContext.getPrincipal() : user;
            //     return _.every(checkPermissions, function (permission, index) {
            //         if (typeof user.role.permissions[index] == 'object') {
            //             return user.role.permissions[index].id == permission;
            //         } else {
            //             return user.role.permissions[index] == permission;
            //         }
            //     });
            // };

            return service;
        }
    ]);
});