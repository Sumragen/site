/**
 * Created by trainee on 4/4/16.
 */
define(['../module'], function (module) {
    module.service('Common.UserPermission', [
        '$rootScope',
        function ($rootScope) {
            var service = {};

            var ROLES = {
                ADMIN: {
                    0x001: 'isTeacher',            //T
                    0x002: 'hasAdminRights',       //A
                    //edit tabs
                    //Users
                    0x003: 'canViewUsers',         //S*
                    0x004: 'canEditUsers',         //S*
                    0x005: 'canAddUsers',          //A
                    0x006: 'canDeleteUsers',       //A
                    //Schedule
                    0x007: 'canViewSchedule',      //S
                    0x008: 'canEditSchedule',      //A
                    0x009: 'canAddSchedule',       //A
                    0x00a: 'canDeleteSchedule',    //A
                    //Events
                    0x00b: 'canViewEvents',        //S
                    0x00c: 'canEditEvents',        //T*
                    0x00d: 'canAddEvents',         //T*
                    0x00e: 'canDeleteEvents'       //T*
                },
                TEACHER: {
                    0x001: 'isTeacher',            //T
                    //edit tabs
                    //Users
                    0x003: 'canViewUsers',         //S*
                    0x004: 'canEditUsers',         //S*
                    //Schedule
                    0x007: 'canViewSchedule',      //S
                    //Events
                    0x00b: 'canViewEvents',        //S
                    0x00c: 'canEditEvents',        //T*
                    0x00d: 'canAddEvents',         //T*
                    0x00e: 'canDeleteEvents'       //T*
                },
                STUDENT: {
                    //edit tabs
                    //Users
                    0x003: 'canViewUsers',         //S*
                    0x004: 'canEditUsers',         //S*
                    //Schedule
                    0x007: 'canViewSchedule',      //S
                    //Events
                    0x00b: 'canViewEvents'         //S
                }
            };

            var _user = $rootScope.contextUser;

            service.hasRole = function (user, role) {
                !user ? user = _user : user ;
                console.log('Current role : ' + user.role);
                console.log('Role in parameter : ' + role);
                (user.role === role) ? console.log('eq') : console.log('non eq')
            };

            return service;
        }
    ]);
});