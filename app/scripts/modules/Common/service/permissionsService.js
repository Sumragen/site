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

            with (permissionSet) {
                var admin = [isTeacher, hasAdminRights, canViewUsers, canEditUser, canAddUsers, canDeleteUsers, canViewSchedule, canEditSchedule, canAddSchedule, canDeleteSchedule, canViewEvents, canEditEvents, canAddEvents, canDeleteEvents];
                var teacher = [isTeacher, canViewUsers, canEditUser, canViewSchedule, canViewEvents, canEditEvents, canAddEvents, canDeleteEvents];
                var student = [canViewUsers, canEditUser, canViewSchedule, canViewEvents];
            }

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