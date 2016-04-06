/**
 * Created by trainee on 4/4/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Common.PermissionsService', [
        'Common.SecurityContext',
        function (securityContext) {
            var service = {};
            var permissionSet = {
                'isTeacher': {value: 0x001, title: 'Teacher rights'},
                'hasAdminRights': {value: 0x002, title: 'Administrator rights'},
                'canViewUsers': {value: 0x003, title: 'Can view list of all users'},
                'canEditUser': {value: 0x004, title: 'Can edit user list'},
                'canAddUsers': {value: 0x005, title: 'Can add new user'},
                'canDeleteUsers': {value: 0x006, title: 'Can delete users'},
                'canViewSchedule': {value: 0x007, title: 'Can view schedule'},
                'canEditSchedule': {value: 0x008, title: 'Can edit schedule'},
                'canAddSchedule': {value: 0x009, title: 'Can add schedule'},
                'canDeleteSchedule': {value: 0x00a, title: 'Can delete schedule'},
                'canViewEvents': {value: 0x00b, title: 'Can view list of all events'},
                'canEditEvents': {value: 0x00c, title: 'Can edit events list'},
                'canAddEvents': {value: 0x00d, title: 'Can add events'},
                'canDeleteEvents': {value: 0x00e, title: 'Can delete events'}
            };

            var p = permissionSet;
            var admin = [
                p.isTeacher, p.hasAdminRights, p.canViewUsers, p.canEditUser, p.canAddUsers,
                p.canDeleteUsers, p.canViewSchedule, p.canEditSchedule, p.canAddSchedule, p.canDeleteSchedule,
                p.canViewEvents, p.canEditEvents, p.canAddEvents, p.canDeleteEvents];
            var teacher = [p.isTeacher, p.canViewUsers, p.canEditUser, p.canViewSchedule, p.canViewEvents, p.canEditEvents, p.canAddEvents, p.canDeleteEvents];
            var student = [p.canViewUsers, p.canEditUser, p.canViewSchedule, p.canViewEvents];

            service.getPermissionSet = function () {
                return angular.copy(permissionSet);
            };

            service.hasPermissions = function (checkPermissions, user) {
                !user ? user = securityContext.getPrincipal() : user;

                /*_.each(user.permissions, function (permission, $index) {
                 if (permission !== checkPermissions[$index]) {
                 return false
                 }
                 });*/
                for (var i = 0; i < checkPermissions.length; i++) {
                    if (user.roles[0].permissions[i] !== checkPermissions[i]) {
                        return false;
                    }
                }
                return true;
            };

            return service;
        }
    ]);
});