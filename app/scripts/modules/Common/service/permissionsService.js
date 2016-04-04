/**
 * Created by trainee on 4/4/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Common.PermissionsService', [
        'Common.SecurityContext',
        function (securityContext) {
            var service = {};

            var permissionSet = {
                'isTeacher': 0x001,
                'hasAdminRights': 0x002,
                'canViewUsers': 0x003,
                'canEditUser': 0x004,
                'canAddUsers': 0x005,
                'canDeleteUsers': 0x006,
                'canViewSchedule': 0x007,
                'canEditSchedule': 0x008,
                'canAddSchedule': 0x009,
                'canDeleteSchedule': 0x00a,
                'canViewEvents': 0x00b,
                'canEditEvents': 0x00c,
                'canAddEvents': 0x00d,
                'canDeleteEvents': 0x00e
            };

            var admin = [0x001, 0x002, 0x003, 0x004, 0x005, 0x006, 0x007, 0x008, 0x009, 0x00a, 0x00b, 0x00c, 0x00d, 0x00e];
            var teacher = [0x001, 0x003, 0x004, 0x007, 0x00b, 0x00c, 0x00d, 0x00e];
            var student = [0x003, 0x004, 0x007, 0x00b];


            service.hasPermissions = function (user, checkPermissions) {
                !user ? user = securityContext.getPrincipal() : user;

                /*_.each(user.permissions, function (permission, $index) {
                 if (permission !== checkPermissions[$index]) {
                 return false
                 }
                 });*/
                for (var i = 0; i < user.permissions.length; i++) {
                    if (user.permissions[i] !== checkPermissions[i]) return false;
                }
                return true;
            };

            return service;
        }
    ]);
});